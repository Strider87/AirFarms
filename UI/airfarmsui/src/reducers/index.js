import loginReducer from "./loginReducer";
import userReducer from "./userReducer";
import commentFileReducer from "./commentFileReducer"
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    isLoggedIn: loginReducer,
    getUser: userReducer,
    getFiles: commentFileReducer
})

export default allReducers