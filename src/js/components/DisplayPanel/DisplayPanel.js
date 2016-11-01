import React from "react";
import ReactDOM from "react-dom";
import { Button,Card,Icon } from "antd";
import { Link } from "react-router";
import CreatePanel from "../CreatePanel/CreatePanel";
//pilot 
import {AddCardToDisplay} from "../../Actions/pilotAction"
import { setAreaDropable } from "../../interactScript";

import { connect } from "react-redux";
import { browserHistory } from "react-router";
//Workflow
import DisplayWorkFlow from "./DisplayWorkFlow";
import WorkFlowDetailPanel from "./WorkFlowDetailPanel"

import Courselist from "./Courselist";
import Coursedetail from "./Coursedetail";


@connect((store)=>{    
    return {
        pilot:store.pilotinfo
    };
    
})
export default class DisplayPanel extends React.Component {   
   

   CloseMainCard(){

      this.props.dispatch(ShowMainPanel());

   }

  componentDidMount() {

      const props = this.props;
      const that = this;
      this.interactable = setAreaDropable({

          element: ReactDOM.findDOMNode(this),
          accept: '.data-item, .data-block,.func-item',
          ondrop: function(event) {
              let draggableElement = event.relatedTarget;
              var x = event.dragEvent.clientX + window.scrollX;
              var y = event.dragEvent.clientY + window.scrollY;
              var data_id = draggableElement.getAttribute('data-id');
              switch(draggableElement.getAttribute('data-type')){
              case "ITEM":
              { 

                console.log(data_id)
                  if(data_id ==4)
                  {

                    var cardinfo = {
                      x:x,
                      y:y,
                      type:"workflowlist"
                      }
                    props.dispatch(AddCardToDisplay(cardinfo))
                  }
                  else if(data_id==5)
                  {
                    var cardinfo1 = {
                      x:x,
                      y:y,
                      type:"courselist"
                    }
                    console.log(cardinfo1)
                    props.dispatch(AddCardToDisplay(cardinfo1))

                  }
                  break;
              }
              case "TITLE":
              {
                  
                  props.dispatch(ShowMainPanel());
                  break;
              }
              case "FUNC":
              {
                  
                  if(data_id == "1"){
                      props.dispatch(ShowCreatePanel());
                  }
                  else if(data_id == "2")
                  {
                  }
                  else if(data_id == "4"){
                    browserHistory.push("/trend")
                  }

                  break;
              }
              default:
                  ;
              }
              
          }
      });
  }

  componentWillUnmount() {
      this.interactable.unset();
      this.interactable = null;
      
  }

  componentDidUpdate() {

  }


  render() {
      var displayarea;
      const {pilot}=this.props;
      const {status} = this.props;
      if(pilot.display.length!=0)
      {
        displayarea =  pilot.display.map((one)=>{
        if(one.type=="workflowlist")
          {
            return <DisplayWorkFlow key={one.cardid}  cardid={one.cardid}/> ;
          }
          if(one.type=="workflowdetail")
          { 
            return <WorkFlowDetailPanel key={one.cardid} cardid={one.cardid}/>     
          }
          if(one.type=="courselist")
          {
            return <Courselist key={one.cardid} cardid={one.cardid} />

          }
          if(one.type == "coursedetail")
          {
            return <Coursedetail key={one.cardid} cardid={one.cardid} courseid={one.course_id} />
          }
        });

      } 


   return (
     <div className="display-panel helpbgkm">
     
    { displayarea }
    </div>
      );
  }
}
