import React, { Component } from 'react';
import { connect } from 'react-redux';

class Content extends Component {
    componentDidMount(){
        console.log(this.props)
    }
    render() {
        return (
            <div>
                Ralph Largo
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        json: state.json
    }
}

export default connect(mapStateToProps)(Content);