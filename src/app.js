import React, { Component } from 'react';

//components
import Converter from './components/converter';

class App extends Component {
    render(){
        return(
            <div class="container">
                <Converter />
            </div>
        )
    }
}

export default App;