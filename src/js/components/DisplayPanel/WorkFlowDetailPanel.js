import React from "react";
import ReactDOM from "react-dom";
import {Card,Icon,Timeline} from "antd";
import {connect} from "react-redux"
import { setCardDragable,handleFocus,setAreaDropable} from "../../interactScript";

import {RemoveCard,ChangeStyle,ChangeToModify} from "../../Actions/pilotAction"

@connect((store)=>{    
    return {
    	status:status,
        pilotinfo:store.pilotinfo
    };
    
})
export default class WorkFlowDetail extends React.Component {


	componentDidMount(){

      const props = this.props;
      const that = this;	
      const {status} = this.props;

      if(status.status == "init")
      setCardDragable(ReactDOM.findDOMNode(this));  

      handleFocus(ReactDOM.findDOMNode(this));   
       this.interactable = setAreaDropable({

          element: ReactDOM.findDOMNode(this),
          accept: '.function-button',
          ondrop: function(event) {
 		      var content = document.getElementById('content');
    	    content.classList.add('content-' + Math.floor(Math.random() * 3));
          		
      		//change status 
      	 	props.dispatch(ChangeToModify());
      		//add change card

              
          }
      });
	}
	RemoveCard()
	{
		var data={

			cardid:this.props.cardid
		}
		this.props.dispatch(RemoveCard(data))
	}

    
    render() {
        return (
        <div  class="workFlowDetailPanel">  
        <Card  title="F0->F1" extra={<Icon type="cross" onClick={this.RemoveCard.bind(this)} />}>
        		<Timeline>
			    <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
			    <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
			    <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
			    <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
				</Timeline>
		</Card>
        </div>
      );
  }
}

