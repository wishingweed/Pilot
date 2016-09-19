import React from "react";

import ReactDOM from "react-dom";

import { connect } from "react-redux"
import { setCardDragable,setAreaDropable,handleFocus} from "../../interactScript";
import {CloseSituation} from "../../Actions/pilotAction";
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
      
      setCardDragable(ReactDOM.findDOMNode(this));  
      handleFocus(ReactDOM.findDOMNode(this));   
                
    }


    render() {
      console.log("situation");
        return (
				
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
      );
  }
}

