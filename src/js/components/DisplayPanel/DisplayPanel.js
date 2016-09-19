import React from "react";
import ReactDOM from "react-dom";
import { Button,Card,Icon } from "antd";
import { Link } from "react-router";
import MainPanel from "./MainPanel";
import DetailPanel from "./DetailPanel";
import CreatePanel from "../CreatePanel/CreatePanel";
import EditPanel from "../EditPanel/EditPanel";
<<<<<<< HEAD
//pilot 
import PersonnalPanel from "./PersonalInfo"
import {ShowPersonnal,ShowSituation} from "../../Actions/pilotAction"
import { setAreaDropable } from "../../interactScript";

import { AddCard}  from "../../Actions/KnowledgeAction";

import { ShowMainPanel,ShowEditPanel,ShowCreatePanel } from "../../Actions/KnowledgeAction";
=======
import { setAreaDropable } from "../../interactScript";
import { ShowMainPanel,ShowEditPanel,ShowCreatePanel,AddCard,ShowPersonnal,ShowPersonalInfo } from "../../Actions/KnowledgeAction";
>>>>>>> origin/login
import { connect } from "react-redux";
import { browserHistory } from "react-router";
import SituationPanel from "./SituationPanel";


@connect((store)=>{    
    return {
        pilot:store.pilot,
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
              console.log(data_id);

              switch(draggableElement.getAttribute('data-type')){
              case "ITEM":
              { 

                  if(data_id==1)
                  {
                    props.dispatch(ShowPersonnal());
                  }
                  if(data_id ==2)
                  {
                    props.dispatch(ShowSituation());

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
    var detaildisplay,Situationdisplay;
      const {pilotinfo}=this.props;
      console.log(pilotinfo)
      if(pilotinfo.showPersonnal == true)
      {
        detaildisplay = <PersonnalPanel></PersonnalPanel>
      }
      if(pilotinfo.showDocument == true)
      {
          Situationdisplay = <SituationPanel></SituationPanel>
      }
    


   return (
     <div className="display-panel helpbgkm">
     
    { detaildisplay }
    { Situationdisplay }
    
    </div>
      );
  }
}
