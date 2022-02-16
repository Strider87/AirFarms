import loginReducer from "./loginReducer";
import userReducer from "./userReducer";
import commentFileReducer from "./commentFileReducer"
import locationReducer from './locationReducer'
import farmReducer from './farmReducer'
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    isLoggedIn: loginReducer,
    getUser: userReducer,
    getFiles: commentFileReducer,
    getLocation: locationReducer,
    getFarm: farmReducer
})

export default allReducers