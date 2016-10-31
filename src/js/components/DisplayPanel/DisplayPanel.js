import React from "react";
import ReactDOM from "react-dom";
import { Button,Card,Icon } from "antd";
import { Link } from "react-router";
import CreatePanel from "../CreatePanel/CreatePanel";
//pilot 
import {ShowPersonnal,ShowSituation,AddCardToDisplay} from "../../Actions/pilotAction"
import { setAreaDropable } from "../../interactScript";

import { ShowMainPanel,ShowEditPanel,ShowCreatePanel } from "../../Actions/KnowledgeAction";

import { connect } from "react-redux";
import { browserHistory } from "react-router";
//Workflow
import DisplayWorkFlow from "./DisplayWorkFlow";
import WorkFlowDetailPanel from "./WorkFlowDetailPanel"



@connect((store)=>{    
    return {
        pilotinfo:store.pilotinfo
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

                  if(data_id ==4)
                  {

                    var cardinfo = {
                      x:x,
                      y:y,
                      type:"workflowlist",
                      cardid:(new Date() + Math.floor(Math.random() * 999999)).toString(31)
                    }
                    props.dispatch(AddCardToDisplay(cardinfo))
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
      const {pilotinfo}=this.props;
      const {status} = this.props;
      if(pilotinfo.display.length!=0)
      {
        displayarea =  pilotinfo.display.map((one)=>{
        if(one.type=="workflowlist")
          {
            return <DisplayWorkFlow key={one.cardid}  cardid={one.cardid}/> ;
          }
          if(one.type="workflowdetail")
          { 
            return <WorkFlowDetailPanel key={one.cardid} cardid={one.cardid}/>     
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
