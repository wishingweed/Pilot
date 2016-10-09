export default function Workflow (
  state = {
   Pilot:null,
   Document:null,
   showPersonnal:false,
   showDocument:false
   
  }, action
) {
  switch (action.type) {
    case "FETCH_PILOT_INFO":{
      return {...state,Pilot:action.payload}


    }
    case "OPEN_PERSONNAL_PANEL":{

            return {...state,showPersonnal:true}
        }

        case "CLOSE_PERSONNAL_PANEL":{

            return {...state,showPersonnal:false}
        }
        case "OPEN_SITUATION_PANEL":{

            return {...state,showDocument:true}
        }

        case "CLOSE_SITUATION_PANEL":{

            return {...state,showDocument:false}
        }



    default:{

      return state
    }
  }
}