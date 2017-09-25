import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateTemplate } from '../actions/template';
import uuid from 'uuid/v1'
import JSONPretty from 'react-json-pretty';

class Converter extends Component {
    constructor(props) {
        super(props);

        this.convert = this.convert.bind(this);
        this.iterate = this.iterate.bind(this);
    }

    iterate(json) {
        for (var key in json) {
            try {
                if (Object.keys(json[key]).length != 0) {
                    if (typeof json[key] == 'object') {
                        this.iterate(json[key])
                    } else {
                        if(key.charAt(0) == '_'){
                            json[key.substr(1, key.length)] = json[key]
                            delete json[key];
                        }
                    }
                } 
            } catch (err) { }
        }
    }

    convert() {
        var x2js = new X2JS();
        let json = x2js.xml2js(this.props.template.value);

        if (json) {
            this.iterate(json);
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