import { combineReducers } from "redux"


import status from "./StatusReducer"
import pilot from "./articleReducer"
import auth from "./authReducer"
import loginuser from "./usersReducer"
import pilotinfo from "./PilotReducer"

export default combineReducers({
	status,
    pilot,
    auth,
    loginuser,
    pilotinfo
    
    
})