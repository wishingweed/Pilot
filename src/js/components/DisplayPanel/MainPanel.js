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
                alert("analysis")

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
        	<div className="main-panel">
           <Card title="DVM Articles" extra={<Icon type="cross" onClick={this.CloseMainCardPanel.bind(this)} />}  >
        	<div class="margin-bottom10"></div>
          </Card>
        </div>

      );
  }
}
