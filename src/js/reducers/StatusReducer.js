export default function Status (
  state = {
  status:"INIT"
  }, action
) {
  switch (action.type) {

    case "CHANGE_TO_MODIFY":{
        
        return {...state,status:"MODIFY"}


     }
    case "CHANGE_TO_INIT":{
        return {...state,status:"INIT"}
    }

    default:{

      return state
    }
  }
}