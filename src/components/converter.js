import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateTemplate } from '../actions/template';
import JSONPretty from 'react-json-pretty';
import guid from 'guid';

class Converter extends Component {
    constructor(props) {
        super(props);

        this.convert = this.convert.bind(this);
        this.iterate = this.iterate.bind(this);
        this.createContentCell = this.createContentCell.bind(this);
    }

    iterate(json) {
        for (var key in json) {
            try {
                if (Object.keys(json[key]).length != 0) {
                    if (typeof json[key] == 'object') {
                        json['id'] = guid.raw();
                        this.iterate(json[key])
                    } else {
                        if(key.charAt(0) == '_'){
                            json[key.substr(1, key.length)] = json[key]
                            delete json[key];
                            delete json['id'];
                        }
                    }
                } 
            } catch (err) { }
        }
    }

    createContentCell(json){
        for (var keys in json){
            switch(keys){
                case 'variable': 
                    json['state'] = variable(json[keys]);
                    delete json['variable']; 
                    break;
                default: break;
            }
        }

        function variable(q){
            switch(q.name.toLowerCase()) {
                case 'logo': return {
                    src: (q.img.src) ? q.img.src : "https://dummyimage.com/300x90/9e9c9e/fff",
                    variable_name: q.name,
                    height: '90px',
                    width: '90px'
                }; break;
                default: break;
            }
        }
    }

    convert() {
        var x2js = new X2JS();
        let json = x2js.xml2js(this.props.template.value);

        if (json) {
            this.iterate(json);
            this.createContentCell(json);
            return (
                <div style={{ marginTop: 10 }}>
                    <JSONPretty id="json-pretty" json={json}></JSONPretty>
                </div>
            )
        } else {
            return <h3>Enter a valid template value.</h3>
        }
    }

    render() {
        let { updateTemplate, template } = this.props;
        return (
            <div class="form-group">
                <hr />

                <div>
                    <textarea class="form-control" value={template.value} rows="5" onChange={(e) => updateTemplate({ value: e.target.value })}></textarea>
                </div>

                {
                    (template.value) ?
                        this.convert() :
                        <h3>Please enter template.</h3>
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        template: state.template
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        updateTemplate
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Converter);