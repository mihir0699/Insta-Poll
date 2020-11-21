import React, {useState, useEffect} from 'react'
import { Typography, Input, Button, Switch } from 'antd';
import { DeleteTwoTone, PlusCircleTwoTone, LogoutOutlined} from '@ant-design/icons'
import DateFnsUtils from "@date-io/date-fns"; 
import "../mobile.css"
import { ToastContainer, toast } from 'react-toastify';
import shortid from "shortid";
import firebase from 'firebase/app'
import 'firebase/auth'
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css';
import {
    DateTimePicker,
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
  } from '@material-ui/pickers';
import "animate.css"
import "../App.css"
import {createPoll} from "../firebase/polls";
import {UserSession} from '../firebase/UserProvider'

export const Home = (props) => {
    const { Title } = Typography;
    const {user} = UserSession();
    const handleLogout  = ()=>{
        firebase.auth().signOut().then(function() {
          }).catch(function(error) {
           
          });
    }
    const { TextArea } = Input;
    const [check, setCheck]= useState(false);

    const [options, setOptions] = useState([{
        index:1,
        title:"",
        count : 0
    }, {
        index:2,
        title:"",
        count : 0
    }]);
    const [selectedDate, handleDateChange] = useState(new Date());
    function onChangeSwitch(checked) {
        setCheck(!check);
      }
    const [title, setTitle] = useState('');
    const handleSubmit = (e)=>{
        if(options.length<2)
        toast.error("Minimum 2 options required!");
        else {
            let flag=0;
            for(let i=0;i<options.length;i++)
            {
                if(options[i].title=="")
                {
                    toast.error("Please fill all the options!");
                    flag=1;
                    break;
                }
            }
            if(flag==0)
            {
                if(title=="")
                {
                    toast.error("Title cannot be empty!");
                    flag=1;
                }
                else{
                  let poll = {};
                  if(check)
                  {
                      poll.expire = true;
                      poll.date = selectedDate;
                  }
                  else
                  poll.expire = false;
                  poll.id = shortid.generate();
                  poll.title = title;
                  poll.creator = user.displayName;
                  poll.votes = {};
                  poll.options = options;
                  createPoll(poll);
                  toast.success("Poll Generated Successfully 🎉");
                  setTimeout(()=>{
                    props.history.push(`/${poll.id}`);
                  }, 2000)
                }
            }
            

        }
    }
    const handleTitle = (e)=>{
        setTitle(e.target.value)
    }
    const handleDelete = (index)=>{
        let array = options;
        let x = []
        array.forEach((option)=>{
           if(option.index!==index)
           {
            //    console.log(option.index, index);
            //    console.log(option.title)
                x.push(option)
           }
        }
        );

        array  = x;
        let i = 1;
        array.forEach((option=>{
            option.index = i;
            i=i+1;
        }))
       // console.log(array);
        setOptions(array);
    }
   
    const handleClick = (e)=>{
        let option = {
            index : options.length +1,
            title: "",
            count : 0
        }
        if(options.length==4)
        toast.warning("Maximum 4 options allowed")
        else
        setOptions([...options, option]);

    }
    
    const handleChange = (index, e)=>{
        let x = options;
        x.forEach((option)=>{
            if(option.index===index)
            option.title = e.target.value;
           
        })
        setOptions([...x]);
    }

    return (
        <div>
               <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className="logout_grid">
                <div>
               <h1 className="animate__animated animate__pulse heading">Create a Realtime Poll Instantly!⚡
               </h1>
               </div>
               <div>
               <Button type="primary" onClick={handleLogout} size="large" className="btn_logout"> Logout <LogoutOutlined /></Button>
               </div>
               </div>
               <ToastContainer newestOnTop autoClose={2000}/>
               <div className="flex_home">
                   <div style={{flexGrow:"2"}} className="min_wide">
               <TextArea   placeholder="Ask a Question..." className="title" onChange={handleTitle} autoSize={{minRows:1.5}}/>
               <br/>
               <br/>
               <div className="flex_btns">
               <Button type="primary" onClick = {handleClick} > Add an Option <PlusCircleTwoTone /></Button>
               
              
               <div>
               <span style={{fontSize:"1rem"}}>Auto Expire after a fixed time</span> &nbsp;<Switch onChange={onChangeSwitch} />
               </div> 
           
               
               {check ? (<DateTimePicker value={selectedDate} disablePast onChange={handleDateChange}/>) : (null)}
               
               </div>
               {!options.length ? (null) : (options.map((option)=>(
                    <div className="options animate__animated animate__fadeInDown">
                    <input type="text" placeholder ={`Option ${option.index}`}  className="option" value={option.title} onChange={(value)=>handleChange(option.index, value)} />
                    <DeleteTwoTone twoToneColor="#eb2f96" style={{fontSize:"1.2rem"}} onClick={()=>{handleDelete(option.index)}}/>
                    </div>
               )))}
        {!options.length ? (null) : (<Button type="primary" size="large" className="submit" onClick={handleSubmit}> Generate Poll 🚀</Button>)}
        </div>
        <div style={{flexGrow:"1"}}>
        <img 
               src="https://image.freepik.com/free-vector/costumer-survey-concept-illustration_114360-459.jpg"  className="home_img animate__animated animate__fadeIn"/>
        </div>
        </div>
        </MuiPickersUtilsProvider>
        </div>
    )
}


