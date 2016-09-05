import React from "react";
import ReactDOM from "react-dom";
import { Modal,Button,Card,Icon} from "antd";
import { connect } from "react-redux";
import TableCharts from "./TableCharts";
import DvmPanel from "./DvmPanel";
import { RemoveCard,GetBestPractice,ShowEditPanel,DeleteArticle,fetchArticles} from "../../Actions/KnowledgeAction";
import { setCardDragable,setAreaDropable } from "../../interactScript";

const confirm = Modal.confirm;
const success= Modal.success;
@connect((store)=>{
    return {
        articles:store.articles,
        auth:store.auth.token
    };
    
})
export default class DetailPanel extends React.Component { 
  constructor(props)
  {
    super(props)
  }


  NavLeft(){

    var data = this.state.articles;
    if(this.state.page > 1){
      
      var pagenumber = this.state.page -1 ;

      this.setState({
        articles:data,
        page:pagenumber
      })

    }
    
  }

  NavRight(){
 
    var data = this.state.articles;
    if(this.state.page < 3){

      var pagenumber = this.state.page + 1;
      
      this.setState({
        articles:data,
        page:pagenumber
    })
    }
    

  }

  componentDidMount() {
    var that = this;
    setCardDragable(ReactDOM.findDOMNode(this));
    
    const props = this.props;
    this.interactable = setAreaDropable({

        element: ReactDOM.findDOMNode(this),
        accept: '.func-item',
        ondrop: function(event) {
            let draggableElement = event.relatedTarget,             
                dropzoneElement = event.target;

            console.log("dropzoneElement:",dropzoneElement);

            if(draggableElement.getAttribute('data-type') == "FUNC"){
              
                var drag_id = draggableElement.getAttribute('data-id');
                var drop_id = dropzoneElement.getAttribute('data-id');
                //edit
                if(drag_id == "2"){
                    
                    props.dispatch(ShowEditPanel(drop_id));
                }
                //delete
                else if(drag_id == "3"){    

                  confirm({
                    title: 'Do you want to delete this article?',
                    content: 'This article will not appear after your deletion',
                    onOk() {
                      var articles = props.articles.articles.results;
                      for(var i = 0;i < articles.length;i++){
                        if(articles[i].ARTICLE_ID == drop_id){

                            props.dispatch(DeleteArticle(articles[i]));
                            that.removeCard();
                            break;
                        }
                      }
                      
                      return new Promise((resolve) => {
                        setTimeout(resolve, 100);
                      });
                    },
        
                    onCancel() {}
                    });
                    
  
                }
                
            }
        }
  
    });
  }

  componentWillMount(){
   

  // get number 
    const { articlenumber } = this.props;
    const { articles } = this.props;
    const { results } = articles.articles;
    const target = results.filter((result)=>{ return result.ARTICLE_ID == articlenumber })
    const { user } = this.props.auth;
    
    var parms = { 
     customerid:user.CUSTOMER_ID,
     articleid : target[0].ARTICLE_ID,
     archobj:target[0].ARCHOBJ
    }

    this.props.dispatch(GetBestPractice(parms))
  

    this.setState({
      articles:target[0],
      page:1
    })


  }

    removeCard(){

      this.props.dispatch(RemoveCard(this.props.articlenumber));      
     
    }

    render() {  

      console.log("detail panel's property:",this.props);
      return (

        <div className="detail-panel" data-id={this.props.articlenumber}>

        <Card title={this.state.articles.ARTICLE_NAM} extra={<Icon type="cross" onClick={this.removeCard.bind(this)} />}>
          <div className="leftside" onClick={this.NavLeft.bind(this)}>
          <Icon type="left" />
          </div>
          <div className="middlecontainer">  

          <DvmPanel Page={this.state.page} Article={this.state.articles}> </DvmPanel>
          </div>
          <div className="rightside" onClick={this.NavRight.bind(this)}>
          <Icon type="right"/>
          </div>
        </Card>
        </div>
      );
  }
}

