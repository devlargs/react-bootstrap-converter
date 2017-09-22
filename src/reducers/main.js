import json from '../../sample';

export default (state = {
    json: json
}, action) => {
    switch (action.type) {
        case 'MAIN_UPDATE':
            console.log(action)
            return state;
        default:
            return state;
    }
}   