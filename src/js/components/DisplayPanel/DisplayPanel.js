import React from "react";
import ReactDOM from "react-dom";
import { Button,Card,Icon } from "antd";
import { Link } from "react-router";
import MainPanel from "./MainPanel";
import DetailPanel from "./DetailPanel";
import CreatePanel from "../CreatePanel/CreatePanel";
import EditPanel from "../EditPanel/EditPanel";

import { setAreaDropable } from "../../interactScript";

import { AddCard }  from "../../Actions/KnowledgeAction";

import { ShowMainPanel,ShowEditPanel,ShowCreatePanel } from "../../Actions/KnowledgeAction";
import { connect } from "react-redux";
import { browserHistory } from "react-router"


@connect((store)=>{    
    return {
        articles:store.articles
    };
    
})
export default class DisplayPanel extends React.Component {   
   

   CloseMainCard(){

      this.props.dispatch(ShowMainPanel());

   }

   componentDidMount() {

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
              case "ITEM":
              { 

                  var data ={
                    x:x,
                    y:y,
                    data_id:data_id
                  };
                  props.dispatch(AddCard(data));
                  break;
              }
              case "TITLE":
              {
                  
                  props.dispatch(ShowMainPanel());
                  break;
              }
              case "FUNC":
              {
                  
                  if(data_id == "1"){
                      props.dispatch(ShowCreatePanel());
                  }
                  else if(data_id == "4"){
                    browserHistory.push("/trend")
                  }
                  break;
              }
              default:
                  ;
              }
              
          }
      });
  }

  componentWillUnmount() {
      this.interactable.unset();
      this.interactable = null;
      
  }

  componentDidUpdate() {
    const {articles} = this.props;
    console.log("good")
    console.log(articles);

    const {displayPanel} = articles;
    if(articles.showCreate==false && articles.showEdit == false && articles.showMain== false && displayPanel.length==0)
    {

      ReactDOM.findDOMNode(this).classList.add('helpbgkm');

    }else{

      ReactDOM.findDOMNode(this).classList.remove('helpbgkm');
    }
  }


    render() {


      // show or close Main Panel
    	const { articles }  = this.props;
    	var DisplayMain;
      var test;
    	test = articles;
    	if(test.showMain === true){ 

      	var array = test.articles;
      	const { results } = array;
    		DisplayMain = <MainPanel results={ results } ></MainPanel>
      }
    	else
    	{
    		DisplayMain = <div></div>
      }

      var createpanel;
      if(test.showCreate == true){

          createpanel = <CreatePanel/>
      }
      else{
         createpanel = <div></div>
      }
      //whether open edit panel
      const { showEdit } = articles;
      var editPanels;
      if( showEdit == true){
        const { updateArticle } = articles;
        const { results } = articles.articles;
        editPanels = results.map((result)=>{
          if(updateArticle.article_id == result.ARTICLE_ID){
            return <EditPanel article={result} />
          }
        });
      }
      else{
        editPanels = <div></div>;
      }
      


     
      // show or close Detail Panels 
      const { displayPanel } = articles ;
      const { results } = articles.articles;
      var detaildisplay = [];
      for(var i = 0; i < displayPanel.length;i++){
        if(displayPanel[i].visible == true){
          for(var j = 0; j < results.length;j++){
            if(displayPanel[i].article == results[j].ARTICLE_ID){
              detaildisplay.push(<DetailPanel article={results[j]} display={displayPanel[i]} />)
            }
          }
        }
      }
      
      if(detaildisplay.length == 0){
        detaildisplay.push(<div></div>);
      }
 

    


   return (
     <div className="display-panel helpbgkm">
     
		{ DisplayMain }
    { detaildisplay }
    { createpanel  }
    { editPanels }
    
    </div>
      );
  }
}
