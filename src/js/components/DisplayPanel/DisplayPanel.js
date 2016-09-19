import React from "react";
import ReactDOM from "react-dom";
import { Button,Card,Icon } from "antd";
import { Link } from "react-router";
import MainPanel from "./MainPanel";
import DetailPanel from "./DetailPanel";
import CreatePanel from "../CreatePanel/CreatePanel";
import EditPanel from "../EditPanel/EditPanel";
import { setAreaDropable } from "../../interactScript";
import { ShowMainPanel,ShowEditPanel,ShowCreatePanel,AddCard,ShowPersonnal,ShowPersonalInfo } from "../../Actions/KnowledgeAction";
import { connect } from "react-redux";
import { browserHistory } from "react-router"


@connect((store)=>{    
    return {
        pilot:store.pilot
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

                  if(data_id==1)
                  {
                    props.dispatch(ShowPersonnal());
                    props.dispatch(ShowPersonalInfo()); 
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
    var detaildisplay
      console.log(this.props);
      const {pilot}=this.props;
      const {personalInfo} =pilot;
      console.log(personalInfo)
      var personalInfoinfo =  personalInfo.map((one)=>{return<h1>{one.name}  </h1>});
      if(pilot.showPersonnal == true)
      {
        detaildisplay = <Card >
        {
           personalInfoinfo
        }
        </Card>
      }
    


   return (
     <div className="display-panel helpbgkm">
     
    { detaildisplay }
    
    </div>
      );
  }
}
