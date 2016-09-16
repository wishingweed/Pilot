import axios from "axios"


export function GET_PILOT_DATA()
{
	 return dispatch=>{
    axios.get("http://localhost:8083/api/pilots",{
       headers:{
        'X-My-Custom-Header': 'Header-Value',
        'content-type':'application/json'
        }
    })
    .then(function (response,err) {
        var data = response.data.d;
        console.log(data);
        dispatch({type:"FETCHDVM",payload:data})    
 		 })
  
    }



}