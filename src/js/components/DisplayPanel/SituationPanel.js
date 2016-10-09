import React from "react";

import ReactDOM from "react-dom";

import { connect } from "react-redux"
import { setCardDragable,setAreaDropable,handleFocus} from "../../interactScript";
import {CloseSituation,ChangeStyle,ChangeWorkflow} from "../../Actions/pilotAction";
import {Card,Icon,Button,Form,Input,Timeline} from "antd";

@connect((store)=>{    
    return {
        Pilot:store.pilotinfo.Pilot
    };  
})
export default class SituationPanel extends React.Component {
    
	closesituation()
	{
		this.props.dispatch(CloseSituation())
	}

    componentDidMount(){
      
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
            
              case "ANALYSIS":
              {
                 var content = document.getElementById('content');
                 content.classList.add('content-' + Math.floor(Math.random() * 3));
                 props.dispatch(CloseSituation());
                 props.dispatch(ChangeWorkflow());
                 break;
              }
              default:
                  ;
              }
              
          }
      });


      setCardDragable(ReactDOM.findDOMNode(this));  
      handleFocus(ReactDOM.findDOMNode(this));   
                
    }


    render() {
        return (
				<div className="data-card">
				<Card style={{width:500}} title="晋升现状" extra={<Icon type="cross" onClick={this.closesituation.bind(this)} />} >
  <Timeline>
    <Timeline.Item color="green">提出申请 2015-09-01</Timeline.Item>
    <Timeline.Item color="green">通过预检 2015-10-01</Timeline.Item>
    <Timeline.Item color="red">
      <p>FTD 固态模拟机测试1</p>
      <p>FTD 固态模拟机测试2</p>
      <p>FTD 固态模拟机测试3 2015-09-01</p>
    </Timeline.Item>
  </Timeline>

				</Card>
        </div>
      );
  }
}

