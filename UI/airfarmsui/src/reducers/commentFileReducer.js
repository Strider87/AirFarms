const initialState = {
    images: []
  }
  

const commentFileReducer = (state = initialState, action) => {
    switch(action.type){
        case 'IMAGE':
            //state = action.payload
            return {
                ...state,
                images: [
                ...state.images,
                {            
                    image: action.payload
                }
                ]
            };
        case "CLEAR_IMAGES": {
            return {
                images: []
            };
            }
          
        default:
            return state;
    }
}

export default commentFileReducer;