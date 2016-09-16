import { combineReducers } from "redux"

import pilot from "./articleReducer"
import auth from "./authReducer"
import loginuser from "./usersReducer"
import dvm from "./DVMReducer"
import pilotinfo from "./PilotReducer"

export default combineReducers({
    pilot,
    auth,
    loginuser,
    dvm,
    pilotinfo
    
    
})