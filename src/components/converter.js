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

    iterate(json){        
        for (var key in json) {
            if(Object.keys(json[key]).length != 0){
                if(typeof json[key] == 'object'){
                    console.log(json[key]);
                    this.iterate(json[key])
                }else{
                    console.log("Inside ", key + ':' + json[key])
                }
            }else{
                console.log("Outside ", key + ':' + json[key])
            }
        }
    }

    convert() {
        var x2js = new X2JS();
        let json = x2js.xml2js(this.props.template.value);
        
        var s = {
            string: "3",
            anotherString: "3",
            isObject: {
                b: {
                    d :1
                }, 
                c: 2
            }
        }

        if (json) {
            this.iterate(s);
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