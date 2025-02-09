import {React,useState,useEffect} from "react";
import wordIcon from '../assets/wordIcon.png'
import { useNavigate } from "react-router-dom";

function Receiver({userLogData}){
    const [messages,setMessages]=useState([]);
    const navigate=useNavigate();
    const [loggedUser,setLoggedUser]=useState(JSON.parse(localStorage.getItem('userLogData')));
    const fetchEmail=(item)=>{
        navigate(`/emailData/${item.messageId}/${item.studentId}`);
    }
    useEffect(()=>{
        const fetchMessages=async ()=>{
            const response=await fetch(`/api/data/messages/${loggedUser.id}`);
            const result=await response.json();
            console.log(result);
            setMessages(result);
        }
        fetchMessages();
        // const interval = setInterval(() => {
        //     fetchMessages();
        //   }, 10000);

        //   return () => clearInterval(interval);
    },[]);
    return(
        <>
            <div className="border h-full w-full p-5 flex flex-col gap-3 overflow-scroll">
                {
                    messages.length>0 ?
                        messages.map((item,index)=>(
                           <div key={index} className="w-full hover:bg-slate-100 border rounded-md flex gap-10 p-3 cursor-pointer" onClick={()=>fetchEmail(item)}>
                                <div className="w-44 overflow-hidden whitespace-nowrap text-ellipsis">
                                    {item.senderName} -
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="w-[1000px] h-7 flex flex-col gap-2 overflow-hidden whitespace-nowrap text-ellipsis">
                                        <div>{item.body}</div>
                                    </div>
                                    <div className="p-2 w-36 rounded-lg flex gap-5">
                                        <img src={wordIcon} alt="" />
                                            <span className="text-xs">
                                                {item.studentId}.docx
                                            </span>
                                    </div>
                                </div>
                                
                            </div>
                        ))
                        
                    :"Hello"
                }
            </div>
        </>
    )
}

export default Receiver;