export default function Pilot (
  state = {
   Pilot:null,
   Document:null,
   display:[]

  }, action
) {
  switch (action.type) {

    case "Add_Card_To_Display":{

    var displayarray = state.display;
    displayarray.push({id:1,type:"workflowlist"})
    return {...state}
     }
    case "FETCH_PILOT_INFO":{
      return {...state,Pilot:action.payload}


    }
          case "OPEN_WORKFLOW_PANEL":{

            var displayarray = state.display;
            displayarray.push({id:1,type:"Workflow"})
            return {...state,displayarray}
        }

    default:{

      return state
    }
  }
}