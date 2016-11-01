import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux"

import {setNodeDragable, setCardDragable,setAreaDropable,handleFocus} from "../../interactScript";

import {RemoveCard,AddCardToDisplay} from "../../Actions/pilotAction"
import {Table,Card,Icon} from "antd";


@connect((store)=>{    
    return {
        pilot:store.pilotinfo
    };
    
})
export default class Courselist extends React.Component { 

    componentDidMount() {
     setCardDragable(ReactDOM.findDOMNode(this));
          handleFocus(ReactDOM.findDOMNode(this));   

      }

OpenCourseDetail(e)
{

  let course_id = e.target.rel;
  let data = {
    type:"coursedetail",
    course_id : course_id
  }
  this.props.dispatch(AddCardToDisplay(data));
}

  RemoveCard()
  {
    var targetcard = {
      cardid : this.props.cardid
    }
    this.props.dispatch(RemoveCard(targetcard));

  }

  render() {
  	console.log(this.props.pilot);
  	const {Courses} = this.props.pilot;

const columns = [{
  title: 'course_id',
  dataIndex: 'course_id',
  key: 'course_id',
  render: (text,record) => <a href="#" onClick={this.OpenCourseDetail.bind(this)} rel={record.course_id}>{text}</a>,
}, {
  title: 'title',
  dataIndex: 'title',
  key: 'title',
}, {
  title: 'category',
  dataIndex: 'category',
  key: 'category',
}, {
  title: 'description',
  key: 'description',
  dataIndex:'description'
}];

        return (
        <div className="detail-panel">  
        <Card title="课程列表" extra={<Icon type="cross" onClick={this.RemoveCard.bind(this)} />}>
        <h1>课程列表</h1>
         <Table columns={columns} dataSource={Courses}  />
        </Card>
        </div>
      );
  }

}