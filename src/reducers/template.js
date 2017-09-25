export default function(state={value: ''}, action){
    switch(action.type){
        case "UPDATE_TEMPLATE": 
            return action.payload;
        break;
    };
    return state;
}