export default function Pilot (
  state = {
   Pilot:null,
   Document:null,
    status:"INIT",
   display:[]

  }, action
) {
  switch (action.type) {

    case "Add_Card_To_Display":{

    const displayarray = state.display;
    const {payload} = action ; 

    payload.status = state.status;
    payload.cardid = (new Date().getTime()+ Math.floor(Math.random() * 999999)).toString(31);
    displayarray.push(payload)
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