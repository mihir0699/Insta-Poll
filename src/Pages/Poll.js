import React, {useEffect, useState} from 'react';
import {firestore} from '../firebase/config';
import { HorizontalBar , Pie, Bar} from 'react-chartjs-2';
import { Typography, Input, Button, Switch, Modal } from 'antd';
import {updatePoll} from "../firebase/polls"
import {Link} from "react-router-dom"
import { ShareAltOutlined } from '@ant-design/icons'
import QRCode from 'qrcode.react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {TwitterIcon, TwitterShareButton, WhatsappShareButton, WhatsappIcon, FacebookIcon, FacebookShareButton} from "react-share";

const Poll = (props) => {
    const id = props.match.params.id;
    const [label, setLabel] = useState([]);
    const [expiry, setExpiry] = useState(false);
    const [poll, setPoll] = useState(null);
    const [modal, setModal] = useState(false);
    const [pollData, setPollData] = useState([]);
    const [index, setIndex] = useState(-1);
    const handleURL = ()=>{
        navigator.clipboard.writeText("http://localhost:3000/" + poll.id);
        toast.success("URL copied to clipboard")
    }
    const showModal = () => {
        setModal(!modal);
      };
    const handleClick = (index)=>{
        setIndex(index);
        if(localStorage.getItem(poll.id))
        {
            if(localStorage.getItem(poll.id)!=index)
            {
                let old = localStorage.getItem(poll.id);
                let x = poll;
                x.options.forEach((option)=>{
                    if(option.index==index)
                    option.count +=1;
                    else if(option.index ==old)
                    option.count -=1;
                })
                localStorage.setItem(poll.id, index);
                updatePoll(x);
            }
            
        }
        else{
            let x = poll;
                x.options.forEach((option)=>{
                    if(option.index==index)
                    option.count +=1;
                })
                localStorage.setItem(poll.id, index);
                updatePoll(x);
        }
        
   

    }
   useEffect(()=>{
       const docRef =  firestore.doc(`/polls/${id}`);
        const unsubscribe = docRef.onSnapshot((document)=>{
            if(document.exists)
            {   setPoll(document.data());
                let x=[], y=[];
              if(document.data().expire)
              {
                if((new Date().getTime()/1000)>=document.data().date.seconds)
                setExpiry(true);
              }
                document.data().options.forEach((option)=>{
                    x.push(option.title);
                    y.push(option.count)
                })
                if(localStorage.getItem(document.data().id))
                {
                    setIndex(localStorage.getItem(document.data().id));
                }
                setLabel(x);
                setPollData(y);
                
            }
            else
            {
              props.history.push("/not_found");
            }
        })
    }, [])

  
      
    const shareUrl = 'http://github.com';
    const data = {

        labels :label,
        datasets: [
          {
            label: 'Number of Votes',
            data: pollData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      }
    
      const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                precision:0,
                fontFamily:"Mulish",
                fontStyle: '500'
              },
              barPercentage:"0.4"
            },
       
           
          ],
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
                precision:0,
                fontFamily:"Mulish",
                fontStyle:"500"
              },
            },
          ],
        },
        legend:{
            labels:{
                fontFamily: "Mulish"
            },
        },
       
        maintainAspectRatio: false
      
    }

if(!poll)
return null
    return (
        <div>
                <h1 className="head_title animate__animated animate__fadeIn">{poll.title} <Link to="/"><Button type="primary" className="create_btn" >Create a new Poll</Button></Link></h1>
               
                <ToastContainer newestOnTop autoClose={2000}/>
             <div className="flex">
             <div className="options_div animate__animated animate__fadeInLeft">
         {expiry ? (<h2>This poll is no longer accepting responses ❌</h2>) : (<h2>Select an Option</h2>)}       
                {expiry ? (poll.options.map((option)=>{
                           if(option.index!=index)
                  return (
                    <div className="poll_live_expire">
                      {option.title}
                    </div>
                  )
                  else
                  return(
                    <div className="poll_live_expire_selected">
                    {option.title}
                  </div>
                  )
                })) :  (poll.options.map((option)=>
                {
                    if(option.index!=index)
                    return(
                        <div className="poll_live" onClick={()=>handleClick(option.index)}>
                        {option.title}
                    </div>
                    )
                    else
                    return(
                        <div className="poll_live_selected " onClick={()=>handleClick(option.index)}>
                        {option.title}
                    </div>
                    )
                }
                   
                ))}
             </div>

             <div className="graph animate__animated animate__fadeInRight">
             <HorizontalBar data={data}  options={options} />
        </div>
            </div>
      <div className="share_icons animate__animated animate__fadeIn">
          <h3>Share this Poll <ShareAltOutlined /></h3>
        <TwitterShareButton
            url={`https://insta-poll-72ce3.web.app/${poll.id}`}
            title={`Vote to this poll titled "${poll.title}"  generated using Insta Poll\n`}
            className="share_icon"
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <WhatsappShareButton
             url={`https://insta-poll-72ce3.web.app/${poll.id}`}
             title={`Vote to this poll titled "${poll.title}"  generated using Insta Poll`}
            separator=":: "
            className="share_icon"
  
          >
            <WhatsappIcon size={32} round  />
          </WhatsappShareButton>
          <FacebookShareButton
            url={`https://insta-poll-72ce3.web.app/${poll.id}`}
            title={`Vote to this poll titled "${poll.title}"  generated using Insta Poll`}
            className="share_icon"
       
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <br/>
          <Input value={`https://insta-poll-72ce3.web.app/${poll.id}`} style={{width:"15rem"}} disabled/>
          <Button type="primary" onClick={handleURL}>Copy URL</Button>
          <Button type="primary" onClick={showModal} style={{margin:"0.5rem"}}>
          Share QR Code
        </Button>
          <Modal
          visible={modal}
          onOk={showModal}
          onCancel = {showModal}
                style={{textAlign:"center"}}
        >
            <QRCode value={`https://insta-poll-72ce3.web.app/${poll.id}`} style={{height:"12rem", width:"12rem"}}  />
             </Modal>
          </div>
        </div>
    )
}

export default Poll

