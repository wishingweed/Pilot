export default function Pilot (
  state = {
   Pilot:{
    userid:"1",
    name:"曹斌",
    password:"test",
    role:"ADM",
    level:{
      current_level:"F0",
      target_level:"F1"
    },
    filghtinfo:{
      filghtTime:900,
      filghtRoute:100
    },
    department:"国航第九飞行编队",
    company:"上海国航",
    create_time:"2016-07-07"
   },
   Document:{
    userid:"1",
    start_date:"2016-10-10",
    level:{
      previous_level:"F0",
      target_level:"F1"
    },
    workflow_id:"workflow1",
    courses:[{
    course_id:"course1",
    title:"固态模拟机乱飞",
    description:"必须飞的",
    category:"课程",
    details:[{
      id:1,
      title:"测试飞行",
      result:true},{
        id:2,
        title:"使用操作杆",result:true}
        ],
    overallcomment:"passed",
   },],
   },
   role:"ADM",
   status:"INIT",
   display:[],
   Workflows:[{
    workflow_id:"workflow1",
    description:"F0->F1 转升流程",
    previous_level:"F0",
    target_level:"F1",
    steps:[
    {
      sequence:1,
      course_id:"course1",
      name:"FTD第一课"
    },
    {
      sequence:2,
      course_id:"course2",
          name:"FTD第二课"
    },
    {
      sequence:3,
      course_id:"course3",
      name:"FTD第三课"
    }
    ]
   }],
   Courses:[{
    course_id:"course1",
    title:"固态模拟机乱飞",
    description:"必须飞的",
    category:"课程",
    details:[{
      id:1,
      title:"测试飞行"},{
        id:2,
        title:"使用操作杆"}]
   },
   {
    course_id:"course2",
    title:"固态模拟机乱11飞22",
    description:"必须飞的324432",
    category:"课程",
    details:[]
   }
   ]
  }, action
) {
  switch (action.type) {

    case "Add_Card_To_Display":{


    const displayarray = state.display;
    const {payload} = action ; 

    payload.status = state.status;
    payload.cardid = (new Date().getTime()+ Math.floor(Math.random() * 999999)).toString(31);
    displayarray.push(payload)
    return {...state}
     }
    case "FETCH_PILOT_INFO":{
      return {...state,Pilot:action.payload}
    }
    case "CHANGE_TO_MODIFY":{

      return {...state,status:"MODIFY"}

    }

    case "Remove_Card":
    {
      var payload = action.payload;
       var displayarray=state.display;
    var newdata =   displayarray.filter((displayone)=>{
        console.log(displayone);

        return displayone.cardid != payload.cardid
      })

      return {...state,display:newdata}
    }
          

    default:{

      return state
    }
  }
}