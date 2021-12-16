const loginReducer = (state = false, action) => {
    switch(action.type){
        case 'ISLOGGEDIN':
            return !state;
        default:
            return state;
    }
}

export default loginReducer;