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
      console.log(this.props);
      var courseid = this.props.courseid;
      const {pilotinfo} = this.props;
      const {Courses} =pilotinfo;

      const targetdata = Courses.filter((course)=>{

        if(course.course_id == courseid)
        {
          return course;
        }
      });

    console.log(targetdata);


        return (
        <div  class="workFlowDetailPanel">  
        <Card  title={targetdata[0].title} extra={<Icon type="cross" onClick={this.RemoveCard.bind(this)} />}>
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

