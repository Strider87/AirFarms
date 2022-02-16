const farmReducer = (state = '{}', action) => {
    switch(action.type){
        case 'FARM':
            state = action.payload
            return state;
        default:
            return state;
    }
}

export default farmReducer;