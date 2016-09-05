import { combineReducers } from "redux"

import articles from "./articleReducer"
import auth from "./authReducer"
import loginuser from "./usersReducer"

export default combineReducers({
    articles,
    auth,
    loginuser
    
    
})