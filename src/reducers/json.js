export default function(state=null, action){
    switch(action.type){
        case "UPDATE_JSON": 
            return action.payload;
        break;
    };
    return state;
}