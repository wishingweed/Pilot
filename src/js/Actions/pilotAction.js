import axios from "axios"


export function GET_PILOT_DATA()
{
	 return dispatch=>{
    axios.get("http://localhost:8083/api/pilots?id=I011111",{
       headers:{
        'X-My-Custom-Header': 'Header-Value',
        'content-type':'application/json'
        }
    })
    .then(function (response,err) {

    	console.log(response.data)
    	var data = response.data[0];
        dispatch({type:"FETCH_PILOT_INFO",payload:data})    
 		 })
  
    }



}

export function ClosePersonnal()
{
	return dispatch=>{

		dispatch({type:"CLOSE_PERSONNAL_PANEL"});
	}
}

export function ShowPersonnal()
{
  return dispatch=>{
    dispatch({type:"OPEN_PERSONNAL_PANEL"})
   }
}
export function CloseSituation()
{
	return dispatch=>{

		dispatch({type:"CLOSE_SITUATION_PANEL"});
	}
}

export function ShowSituation()
{
  return dispatch=>{
    dispatch({type:"OPEN_SITUATION_PANEL"})
   }
}