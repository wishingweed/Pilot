import React from "react";
import ReactDOM from "react-dom";
import {Card,Icon,Timeline,Button, Modal, Form, Input, Radio } from "antd";
import {connect} from "react-redux"
import { setCardDragable,handleFocus,setAreaDropable} from "../../interactScript";

import {RemoveCard,ChangeStyle,ChangeToModify} from "../../Actions/pilotAction"



const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form } = props;
    console.log(props);
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="Create a new collection"
        okText="Create"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form vertical>
          <FormItem label="Title">
            {getFieldDecorator('title', {
              rules: [{ required: true, message: 'Please input the title of collection!' }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="Description">
            {getFieldDecorator('description')(<Input type="textarea" />)}
          </FormItem>
          <FormItem className="collection-create-form_last-form-item">
            {getFieldDecorator('modifier', {
              initialValue: 'public',
            })(
              <Radio.Group>
                <Radio value="public">Public</Radio>
                <Radio value="private">Private</Radio>
              </Radio.Group>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
);


@connect((store)=>{    
    return {
    	status:status,
        pilotinfo:store.pilotinfo
    };
    
})
export default class CourseDetail extends React.Component {
    constructor(props)
    {
      super(props)

      this.state={ visible:false }

    }
    showModal() {
    this.setState({ visible: true });
  }
  handleCancel() {
    this.setState({ visible: false });
  }
  handleCreate() {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  }
  saveFormRef(form) {
    this.form = form;
  }

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
      const {details} = targetdata[0];
      let timeline =  details.map((detail)=><Timeline.Item key={detail.id+"coursedetail"}>{detail.title}</Timeline.Item>)

        return (
        <div  class="workFlowDetailPanel">  
        <Card  title={targetdata[0].title} extra={<Icon type="cross" onClick={this.RemoveCard.bind(this)} />}>
        		<Timeline>
			    {timeline}
				</Timeline>
          <Button type="primary" onClick={this.showModal.bind(this)}>New Collection</Button>
        <CollectionCreateForm
          ref={this.saveFormRef.bind(this)}
          visible={this.state.visible}
          onCancel={this.handleCancel.bind(this)}
          onCreate={this.handleCreate.bind(this)}
        />
        
		</Card>
        </div>
      );
  }
}

