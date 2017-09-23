import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'; 
import sample from '../../sample'
import { updateJson } from '../actions';

class Converter extends Component {
    constructor(props){
        super(props);

        this.convert = this.convert.bind(this);
    }
    
    componentDidMount(){
        this.props.updateJson(JSON.stringify(sample))
        setTimeout(() => {
            console.clear();
        }, 0)
    }

    convert(){
        try {
            var parsed = JSON.parse(this.props.json)
        } catch (err){
            toastr.error("Error. Not an Object.")
        }
    }

    render(){
        return (
            <div class="form-group">
                <hr/>
                {
                    <div>
                        <label for="comment">Enter JSON format to be converted:</label>
                        <textarea value={this.props.json} class="form-control" rows="5" onChange={(e) => this.props.updateJson(e.target.value)}></textarea>
                        <button onClick={this.convert} class="btn btn-success pull-right" style={{marginTop:10}}>Convert</button>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        json: state.json
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        updateJson
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Converter);