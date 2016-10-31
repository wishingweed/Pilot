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
      displayarray.push(action.payload)
      return {...state}
    }
    
    case "FETCH_PILOT_INFO":{
      return {...state,Pilot:action.payload}
    }

    case "Remove_Card":
    {
      var payload = action.payload;
       var displayarray=state.display;
    var newdata =   displayarray.filter((displayone)=>{
        console.log(displayone);

        return displayone.cardid != payload.cardid
      })

      return {...state,display:newdata}


    }
          

    default:{

      return state
    }
  }
}