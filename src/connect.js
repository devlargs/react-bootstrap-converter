import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators from './actions';

function mapStateToProps(state){
    return Object.assign({}, state);
    // return { ...state }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps);