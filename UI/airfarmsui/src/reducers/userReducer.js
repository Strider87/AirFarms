const userReducer = (state = '{}', action) => {
    switch(action.type){
        case 'USER':
            state = action.payload
            return state;
        default:
            return state;
    }
}

export default userReducer;