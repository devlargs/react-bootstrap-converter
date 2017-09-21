import React, { Component } from 'react';
import { render } from 'react-dom';
import sample from '../sample'
import Content from './components/content';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            convert: true,
            json: JSON.stringify(sample)
        }

        this.convert = this.convert.bind(this);
    }

    convert() {
        try {
            let parsed = JSON.parse(this.state.json);
            this.setState({ json: parsed, convert: false })
        } catch (err) {
            if (err) {
                toastr.error("Error. Wrong format.")
            }
        }

    }

    render() {
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
                            <Content json={this.state.json}/>
                        </div>
                }
            </div>
        );
    }
}

render(<App />, document.getElementById('container'));