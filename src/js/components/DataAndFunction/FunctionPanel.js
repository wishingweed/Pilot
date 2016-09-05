import React from "react";
import { Button } from "antd";
import FunctionItem from "./FunctionItem";
import { ShowMainPanel,ShowEditPanel,ShowCreatePanel } from "../../Actions/KnowledgeAction";


import { connect } from "react-redux";



@connect((store)=>{    
    return {
        articles:store.articles
    };
    
})
export default class FunctionPanel extends React.Component {
  CreatePanel()
  {
     this.props.dispatch(ShowCreatePanel());
  }
  EditPanel(){
      this.props.dispatch(ShowEditPanel());
  }
  ShowMain(){

      this.props.dispatch(ShowMainPanel());

  }

    render() {


        return (
       <div className = "function-panel ">
         <FunctionItem text="Create" id="1"/>
         <FunctionItem text="Edit" id="2"/>
         <FunctionItem text="Delete" id="3"/>
         <FunctionItem text="Show Main" id="4"/>
        </div>
      );
  }
}
