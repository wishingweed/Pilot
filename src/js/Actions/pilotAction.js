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

export function AddCardToDisplay(test)
{ 

console.log(test)
  return dispatch=>{

    dispatch({type:"Add_Card_To_Display",payload:test})

  }
}

export function RemoveCard(data)
{
 
 return dispatch=>{

  dispatch({type:"Remove_Card",payload:data})
 }
}

export function ChangeStyle()
{
  var content = document.getElementById('content');
    content.classList.add('content-' + Math.floor(Math.random() * 3));
}

export function ChangeWorkflow()
{

  return dispatch=>{
    dispatch({type:"OPEN_WORKFLOW_PANEL"})

  }
}


export function ChangeToModify(workflowid)
{
   return dispatch=>{
    dispatch({type:"CHANGE_TO_MODIFY",payload:workflowid});
    }
}

export function AddCourseToStep(courseTitle,workflowid,stepSequence,courseid){
  return dispatch=>{
    dispatch({type:"ADD_COURSE_TO_STEP",payload:courseTitle,payload1:workflowid,payload2:stepSequence,payload3:courseid})
  }
}

export function ChangeStepSequence(steps,workflowid){
  return dispatch=>{
    dispatch({type:"CHANGE_STEP_SEQUENCE",payload:steps,payload1:workflowid})
  }
}

export function DeleteCourseFromStep(workflowid,stepSequence,courseid)
{
  return dispatch=>{
    dispatch({type:"DELETE_COURSE_FROM_STEP",payload:workflowid,payload1:stepSequence,payload2:courseid})
  }
}

export function SaveStepsSequence()
{
  return dispatch =>{
    dispatch({type:"SAVE_STEPS_SEQUENCE"})
  }
}
