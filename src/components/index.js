import React, { Component } from 'react';
import Content from './content';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateMain } from '../actions/index';

console.log(updateMain)

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            convert: true,
        }

        this.convert = this.convert.bind(this);
    }

    convert() {
        // try {
        //     let parsed = JSON.parse(this.state.json);
        //     this.setState({ json: parsed, convert: false })
        // } catch (err) {
        //     if (err) {
        //         toastr.error("Error. Wrong json format.")
        //     }
        // }
        this.props.updateMain({ralph: "largo"})
    }

    render() {
        console.log(this.props.updateMain)
        return (
            <div class="container" style={{ marginTop: 20 }}>
                {
                    (this.state.convert) ?
                        <div class="form-group">
                            <label for="comment">Enter JSON:</label>
                            <textarea class="form-control" rows="5" value={this.state.json} onChange={(e) => { this.setState({ json: e.target.value }) }}></textarea>
                            <button className="btn btn-success" style={{ marginTop: 10 }} onClick={this.convert}>Convert</button>
                        </div> :
                        <div>
                            <Content />
                        </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        json: state.main.json
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        updateMain: updateMain
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);