export default function Pilot (
  state = {
   Pilot:null,
   Document:null,
   showPersonnal:false,
   showDocument:false,
   display:[]

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

        case "OPEN_WORKFLOW_PANEL":{

            var displayarray = state.display;
            displayarray.push({id:1,type:"Workflow"})
            return {...state,}
        }

    default:{

      return state
    }
  }
}