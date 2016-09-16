export default function Pilot (
  state = {
   Pilot:null,
   Document:null,
   showPersonnal:false,
   showDocument:false


  }, action
) {
  switch (action.type) {
    case "FETCH_PILOT_INFO":{

      
    }
    case "OPEN_PERSONNAL_PANEL":{

            return {...state,showPersonnal:true}
        }

        case "CLOSE_PERSONNAL_PANEL":{

            return {...state,showPersonnal:false}
        }
        case "OPEN_DOCUMENT_PANEL":{

            return {...state,showDocument:true}
        }

        case "CLOSE_DOCMENT_PANEL":{

            return {...state,showDocument:false}
        }



    default:{

      return state
    }
  }
}