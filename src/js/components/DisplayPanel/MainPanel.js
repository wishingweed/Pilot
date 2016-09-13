import React from "react";
import ReactDOM from "react-dom";
import { Button,Card,Icon,Table,Input } from "antd";

import ArticleMenuTile from "./ArticleMenuTile";
import { AddCard }  from "../../Actions/KnowledgeAction";

import { CloseMainPanel } from "../../Actions/KnowledgeAction";
import { setCardDragable,handleFocus,setAreaDropable } from "../../interactScript";
import { connect } from "react-redux";

@connect((store)=>{    
    return {
        articles:store.articles
    };
    
})

export default class MainPanel extends React.Component {
   constructor(props) {
   super(props)    
   //   const { results } = this.props;

        this.state={ 
          selectedRowKeys: [],  // 这里配置默认勾选列
          loading: false,

        }
    }


    CloseMainCardPanel(){

      this.props.dispatch(CloseMainPanel());

    }

    componentDidMount(){
      
      setCardDragable(ReactDOM.findDOMNode(this));  
      handleFocus(ReactDOM.findDOMNode(this));   
                
    }




    render() {
     
        return (
        	<div className="main-panel">
           <Card title="DVM Articles" extra={<Icon type="cross" onClick={this.CloseMainCardPanel.bind(this)} />}  >
        	<div class="margin-bottom10"></div>
          </Card>
        </div>

      );
  }
}
