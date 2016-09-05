import React from "react";
import axios from "axios";
import { Spin, Alert } from 'antd';
import { connect } from "react-redux";
import { Progress,Rate,Input,Tabs,Slider,Popover,Tag } from "antd";
import { GetBestPractice } from "../../Actions/KnowledgeAction";
import  ReactHighCharts  from "react-highcharts";
const TabPane = Tabs.TabPane;

@connect((store)=>{
    return {
        articles:store.articles,
        customer:store.auth.token.user
    };
    
})

export default class BestPanel extends React.Component {
constructor(props)
{
 	super(props)
     const  { bestpractice } = this.props;
     var content;
     var number;
     const { detail } = bestpractice;

     console.log(detail.BEST_PRACTICE)
     if(detail.BEST_PRACTICE)
     {
     	 number = parseInt(detail.BEST_PRACTICE)/12

     }
     console.log(number)

     if(detail.RANK == 1)
     {
      content= " Less than 10 archiving experience in our database";
     }
     else if(detail.RANK==2)
     {
 	content= " Around 30 archiving experience in our database";
     }
     else if(detail.RANK==3)
     {
	 content= " Around 50 archiving experience in our database";     
     }
     else if(detail.RANK ==4 )
     {
     	 content= " Less than 80 archiving experience in our database";
     
     }
     else if(detail.RANK ==5 )
     {
     	 content= " More than 80 archiving experience in our database";
     }

        this.state={
     		saveyear:number,
     		hintcontent:content

     	}



} 

    render() {  
    	console.log(this.state);
      const {articles } =this.props;

     const  { bestpractice } = this.props;

     const { detail } = bestpractice;


     const {customer} = this.props;
    var currentdate= new Date();
   var recommendmark = currentdate.getFullYear() - parseInt(this.state.saveyear);
   var marknumber = 192-parseInt(detail.BEST_PRACTICE);
  var marks = {
  1: '2000',
  130:{
    style:{
      color:'green',
    },
    label:<strong>2011</strong>
  },
  192: '2016'
};
marks[marknumber] = {
    style: {     
     color: 'red',
    },
    label: <strong>{recommendmark}</strong>,
  }

        return (


          <div className="margin-top10">
            <h2>Overal Rating for {this.props.archobj} in Smart Operation</h2>
            <br/>
            <Popover placement="top" content={this.state.hintcontent}><div>Rank:<Rate disabled defaultValue={detail.RANK?parseInt(detail.RANK):1} /></div>
            </Popover>
            <br/>
            <hr />
            <h2 className="margin-top10 margin-bottom10">Industry-Based Statistics {customer.INDUSTRY?"("+customer.INDUSTRY+")":""} </h2>
            <h3>Avg Saving Percent for the first DVM Run:&nbsp;
        
            <Progress type="circle" percent={parseInt(bestpractice.AVGS).toFixed(2)}/>
            </h3>   
            <div className="margin-top10 margin-bottom10">
              <Tabs defaultActiveKey="1" >
              <TabPane tab="Best Practice For Archiving" key="1" className="margin-left10" disabled={detail.ARCHIVING?false:true}>
              <div className="margin10">
              {detail.ARCHIVING}
              <Popover placement="right" content={"Varify the data in Your Database whether it meet the recommandation(before"+recommendmark+")"}>
              <div>
              <div >
              Average Residence Time in our database:  <Tag closable color="red" closable={false}>{bestpractice.Retention?parseInt(bestpractice.Retention):0}</Tag>Month And the
              Candidate Data for archiving :
              <Slider marks={marks} min={1} max = {192}  defaultValue={marknumber} disabled={true}  tipFormatter={null}/>
              </div>
              </div>
              </Popover>
              <br />
            </div>
  
            </TabPane>
            <TabPane tab="Best Practice for Deletion" key="2" disabled={detail.DELETION?false:true}>{detail.DELETION}</TabPane>
            <TabPane tab="Best Practice for Summarization" key="3" disabled={detail.SUMMARIZATION?false:true}>{detail.SUMMARIZATION}</TabPane>
            <TabPane tab="Best Practice for Avoidance" key="4" disabled={detail.AVOIDANCE?false:true}>{detail.AVOIDANCE}</TabPane>
        </Tabs>   
        </div>
        </div>

  
      );
  }
}


