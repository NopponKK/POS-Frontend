

export function drawerReducer(state = false,action ){
    switch(action.type){
        case "SET_VISABLE":
            return action.payload; 
        default:
            return state;

    }
}
