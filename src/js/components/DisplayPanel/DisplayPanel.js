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
      console.log("display panel did mount,and props is:",props);
      this.interactable = setAreaDropable({

          element: ReactDOM.findDOMNode(this),
          accept: '.data-item, .data-block,.func-item',
          ondrop: function(event) {
              let draggableElement = event.relatedTarget;
              console.log("draggableElement",draggableElement);
              switch(draggableElement.getAttribute('data-type')){
              case "ITEM":
              {
        
                  props.dispatch(AddCard(draggableElement.getAttribute('data-id')));
                  break;
              }
              case "TITLE":
              {
                  
                  props.dispatch(ShowMainPanel());
                  break;
              }
              case "FUNC":
              {
                  var data_id = draggableElement.getAttribute('data-id');
                  if(data_id == "1"){
                      props.dispatch(ShowCreatePanel());
                  }
                  else if(data_id == "4"){
                      props.dispatch(ShowMainPanel());
                  }
                  break;
              }
              default:
                  ;
              }
              
              //props.dispatch(AddCard( props.uniquekey ));
          }
      });
  }

  componentWillUnmount() {
      this.interactable.unset();
      this.interactable = null;
      
  }


    render() {


      // show or close Main Panel
    	const { articles } = this.props;
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
      var detaildisplay;
      detaildisplay = displayPanel.map((displayone)=>{  
      if(displayone.visible==true)
      {
        return <h1><DetailPanel articlenumber={displayone.article}></DetailPanel></h1> 
      }
      else { return <div></div>}
      } )
 

    


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
