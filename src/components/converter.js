import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateTemplate } from '../actions/template';

class Converter extends Component {
    constructor(props) {
        super(props);

        this.convert = this.convert.bind(this);
    }

    convert() {
        
    }

    render() {
        console.log(this.props)
        return (
            <div class="form-group">
                <hr />
                {
                    <div>
                        <label for="comment">Enter bootstrap template to be converted:</label>
                        <textarea class="form-control" value={this.props.template.value} rows="5" onChange={(e) => this.props.updateTemplate({ value: e.target.value })}></textarea>
                        <button onClick={this.convert} class="btn btn-success pull-right" style={{ marginTop: 10 }}>Convert</button>
                    </div>
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