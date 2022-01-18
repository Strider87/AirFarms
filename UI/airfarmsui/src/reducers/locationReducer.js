const initialState = {
    lat: 18.0,
    lng: 73.0
}

const locationReducer = (state = {lat:18.0, lng:73.0}, action) => {
    switch(action.type){
        case 'LOCATION':
            state = action.payload
            return state;
        default:
            return state;
    }
}

export default locationReducer;