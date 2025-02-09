import {React,useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import wordIcon from '../assets/wordIcon.png'
import back from '../assets/back.svg'

function EmailData(){
    const {studentId,messageId}=useParams();
    const [messageBody,setMessageBody]=useState(null);
    const [messageSubject,setMessageSubject]=useState(null);
    const [messageAttachedFileContent,setFileContent]=useState(null);
    const [fileContent,setFileData]=useState(null);
    const fetchFile=()=>{
        localStorage.setItem('fileContent',messageAttachedFileContent)
        setFileData(messageAttachedFileContent);
    }
    const backPage=()=>{
        localStorage.setItem('fileContent',null)
        setFileData(null);
    }
    useEffect(()=>{
        const fetchEmail=async ()=>{
            const response=await fetch(`/api/data/messageContent/${studentId}/${messageId}`);
            const result = await response.json();
            setMessageBody(result.messageContent.body);
            setMessageSubject(result.messageContent.subject);
            setFileContent(result.fileContent);
        }

        fetchEmail();
    },[]);
    return(
        <>
            <div className={`text-xs bg-white font-serif absolute top-0 z-10 h-screen ${fileContent ? "w-screen p-10" : "hidden" } overflow-scroll flex flex-col gap-5`}>
                <img width="18px" className='cursor-pointer hover:w-[20px] h-10' src={back} alt="" onClick={()=>backPage()}/>
                <div className='h-full' dangerouslySetInnerHTML={{ __html: fileContent }} />
            </div>
            <div className={`flex flex-col gap-10 p-5 ${fileContent ? "hidden" : "" }`}>
                <div className='flex gap-20'>
                    <div className='w-20 h-10'>Subject-</div>
                    <div className="">{messageSubject}</div>
                </div>
                <div className='w-full border'></div>
                <div className='flex flex-col gap-5 h-60 overflow-scroll'>
                    <div className='w-20 h-10'>Body-</div> 
                    <div className='h-7'>{messageBody}</div>
                </div>
                <div className='w-full border'></div>
                <div>Attachment-</div>
                <div className="w-64 h-40 border relative overflow-hidden cursor-pointer hover:bg-slate-100" onClick={()=>(fetchFile())}>
                    <div className='text-xs font-serif p-2' dangerouslySetInnerHTML={{ __html: messageAttachedFileContent }} />
                    <div className='bg-slate-200 absolute h-8 bottom-0 w-full flex items-center gap-5 px-2'><img src={wordIcon} alt="" /><span className="text-xs">{studentId}.docx</span></div>
                </div>
            </div>
           
        </>
    )
}

export default EmailData;