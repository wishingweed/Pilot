import React from "react";
import ReactDOM from "react-dom";
import DataItem from "./DataItem";

import { Link } from "react-router";
import { setNodeDragable } from "../../interactScript";


export default class DataBlock extends React.Component {
    
    componentDidMount() {
        this.interactable = setNodeDragable(ReactDOM.findDOMNode(this));
    }
    componentWillUnmount() {
      this.interactable.unset();
      this.interactable = null;
    }

    render() { 
    var DataItems;
  var topfive1 = [
  {ARTICLE_ID:"1",
    ARTICLE_NAM:"个人信息",
    length:"100"
  },
  {
    ARTICLE_ID:"2",
    ARTICLE_NAM:"晋升现状",
    length:"100"
  },
  {
    ARTICLE_ID:"3",
    ARTICLE_NAM:"消息",
    length:"100"

  }]

  if(topfive1.length>0)
  {
    DataItems = topfive1.map((item)=><DataItem title = {item.ARTICLE_NAM} key = {item.ARTICLE_ID} uniquekey={item.ARTICLE_ID} />);
  }
  else
  {
    DataItems = <h1> No Data Found</h1>
  }

        return (
          <div className="data-block" data-type="TITLE"> 
          <div className="data-title" >
            <span> DVM </span>
          </div>
          { DataItems }
          </div>
      );
  }
}