import { createStore } from 'redux';
import rootReducer from './reducers/index';

const defaultState = {
    test: 1
};  

const store = createStore(rootReducer, defaultState);

export default store;