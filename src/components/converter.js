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
        this.rename = this.rename.bind(this);
    }

    rename(json){
        // if(Object.keys(json).length != 0){
        //     Object.keys(json).map((key, idx) => {
        //         this.rename(key)
        //     })
        // }else{
        //     console.log(json)
        // }
    }

    convert() {
        var x2js = new X2JS();
        let json = x2js.xml2js(this.props.template.value);
        
        if (json) {
            this.rename(json);
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