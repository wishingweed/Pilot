import React from "react";

import ReactDOM from "react-dom";

import { connect } from "react-redux"
import { setCardDragable,setAreaDropable,handleFocus} from "../../interactScript";
import {ClosePersonnal} from "../../Actions/pilotAction";

import {Card,Icon,Button,Form,Input,InputNumber} from "antd";







const FormItem = Form.Item;


let Demo = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
   },

  render() {
          const formItemLayout = {
          labelCol: { span: 6 },
          wrapperCol: { span: 14 },
        };
    const { getFieldProps } = this.props.form;
    const {setFieldsInitialValue} = this.props.form;
    const {data } = this.props;

    console.log(this.props)
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormItem
                  {...formItemLayout}
          label="姓名"
        >        

        <p className="ant-form-text" id="userName" name="userName">{data.name}</p>
            </FormItem>
        
    
         <FormItem
                  {...formItemLayout}
          label="用户ID"
        >
	     <p className="ant-form-text" name="userId">{data.id}</p>

        </FormItem>
         <FormItem
                  {...formItemLayout}
          label="重置密码"
        >
          <Input  placeholder="密码"
            {...getFieldProps('password')}
          />
        </FormItem>
                 <FormItem
                  {...formItemLayout}
          label="职位"
        >

       
	     <p className="ant-form-text" name="userId">{data.role}</p>
        </FormItem>
         <FormItem
                  {...formItemLayout}
          label="等级"
        >
       
	     <p className="ant-form-text" name="userId">{data.level.current_level}</p>
        </FormItem>


         <FormItem
                  {...formItemLayout}>
        <Button type="primary" htmlType="submit">save</Button>

        </FormItem>
      </Form>
    );
  },
});

Demo = Form.create()(Demo);


@connect((store)=>{    
    return {
        Pilot:store.pilotinfo.Pilot
    };
    
})
export default class PersonnalPanel extends React.Component {
    
	closePersonnal()
	{
		this.props.dispatch(ClosePersonnal())
	}

    componentDidMount(){
      
      setCardDragable(ReactDOM.findDOMNode(this));  
      handleFocus(ReactDOM.findDOMNode(this));   
                
    }


    render() {
        return (
				
				<Card style={{width:500}} title="个人信息" extra={<Icon type="cross" onClick={this.closePersonnal.bind(this)} />} >
					
				<Demo data={this.props.Pilot}></Demo>

				</Card>
      );
  }
}

