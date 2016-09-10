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

    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.setState({
        selectedRowKeys:selectedRowKeys
      });
      var length = selectedRowKeys.length;
      this.props.dispatch(AddCard(selectedRowKeys[length-1]));
      
    }




   addnewCard(e)
   {

      this.props.dispatch(AddCard(e.target.rel));
   }

  filterSearch(e){
  
   const { results } = this.props;
   const searcharray = results.concat();
   var data = searcharray.filter((one)=>{

    if(one.ARTICLE_NAM.indexOf(e.target.value)!=-1)
    {
        return one;     
    }
    else if(one.ARTICLE_DSC.indexOf(e.target.value)!=-1)
    {
      return one;

    }

   });


  var tabledata = data.map((result)=>{
          return {
            key:result.ARTICLE_ID,
            article_nam:result.ARTICLE_NAM,
            article_dsc:result.ARTICLE_DSC,
            archobj:result.ARCHOBJ,
            total_size:result.TOTAL_SIZE
          }
      });
      this.setState({
        "tabledata": tabledata
      });

  }

    render() {
      var results;
      var data;

      if(!this.state.tabledata)
      {
        const { articles} = this.props;
        results = articles.articles.results;
        data = results.map((result)=>{
          return {
            key:result.ARTICLE_ID,
            article_nam:result.ARTICLE_NAM,
            article_dsc:result.ARTICLE_DSC,
            archobj:result.ARCHOBJ,
            total_size:result.TOTAL_SIZE
          }
      });
    }
    else{
      data= this.state.tabledata
    }
   

        
    	var columns = [        
        {
          title: 'Article Name',
          width:150,
          dataIndex: 'article_nam',
          render:(text,record)=><a href='#' onClick={this.addnewCard.bind(this)} rel={record.key}>{text}</a>
        },
        {
          title: 'Article Description',
          width:150,
          dataIndex: 'article_dsc'
        },
        {
          title: 'Archiving Object',
          width:150,
          dataIndex: 'archobj'
        },
        {
          title: 'Total Size (GB)',
          width:150,
          dataIndex: 'total_size'
        }];
               

        return (
        	<div className="main-panel">
           <Card title="DVM Articles" extra={<Icon type="cross" onClick={this.CloseMainCardPanel.bind(this)} />}  >
        	<div class="margin-bottom10">
          <Input placeholder="Search help" size="small" onChange={this.filterSearch.bind(this)}/>
          </div>
          <Table columns={columns} dataSource={data}  pagination={{ pageSize: 10 }} scroll={{ y: 240 }} />
          </Card>
        </div>

      );
  }
}
