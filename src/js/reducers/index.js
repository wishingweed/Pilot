import { combineReducers } from "redux"

import pilot from "./articleReducer"
import auth from "./authReducer"
import loginuser from "./usersReducer"
import dvm from "./DVMReducer"

export default combineReducers({
    pilot,
    auth,
    loginuser,
    dvm
    
    
})