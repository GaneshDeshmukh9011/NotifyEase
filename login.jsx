import {useState,React} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import { fetchData } from '../api';


function Login({userLogin,setUserRole,setUserLogData}){
    const navigate=useNavigate();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const userRole=document.getElementById("role").value;
        const email=document.getElementById("email").value;
        const password=document.getElementById("password").value;
        
        const userData={
            role:userRole,
            email:email,
            password:password
        }
    
        const header={
            "Content-type":"application/json"
        }
        const response=await fetch("/api/data/login",{
            method:"POST",
            headers:header,
            body:JSON.stringify(userData)
        });
    
        const result=await response.json();

        if(result.status)
        {
            userLogin();
            if(result.userData.role==="admin")
            {
                localStorage.setItem('role','admin');
                localStorage.setItem('userLogData',JSON.stringify(result.userData));
                setUserLogData(result.userData);
                setUserRole("admin");
            }
            else{
                localStorage.setItem('role','student');
                localStorage.setItem('userLogData',JSON.stringify(result.userData));
                setUserLogData(result.userData);
                setUserRole("student");
            }
            localStorage.setItem("isLogin","1");
            navigate("/");
        }
        else{
            navigate("/register");
        }
    }
    return (
        <>
            <div className="h-[100%] flex justify-center items-center">
                <div className="w-[400px]">
                    <h1 className="text-2xl font-medium mb-2">Login Your Account</h1>
                    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                        <div className='flex flex-col'>
                            <label htmlFor="role" className='text-sm text-red-500'>*</label>
                            <select name="role" id="role" className='border p-2 rounded-lg' required>
                                <option value="">Login as</option>
                                <option value="admin">Admin</option>
                                <option value="student">Student</option>
                            </select>
                        </div>
                        <input type="email" id="email" name="email" placeholder="Email" className="p-3  rounded-md bg-gray-100 outline-none" required/>
                        <input type="password" id="password" name="password" placeholder="password" className="p-3  rounded-md bg-gray-100 outline-none" required/>
                        <div className="flex items-center gap-10">
                            <button type="submit" className="p-2 w-1/4 rounded-md bg-blue-600 text-white ">Login</button>
                            <Link to="/register"><span className="text-blue-400 cursor-pointer font-semibold">Create your account</span></Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;