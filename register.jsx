import React,{useState} from 'react';
import {Link} from 'react-router-dom';
function Register(){
    const [student,setStudent]=useState(false);
    const handleRoleChange = (e) => {
        const selectedRole = e.target.value;
        if (selectedRole === "student") {
            setStudent(true);
        } else {
            setStudent(false);
        }
    };

    return(
        <>
            <div className="h-[100%] border flex justify-center items-center">
                <div className="w-[400px]">
                    <h1 className="text-2xl font-medium mb-2">Register</h1>
                    <form action="/api/data/registerUser" method="post" className="flex flex-col gap-5">
                        <div className='flex flex-col'>
                            {/* <label htmlFor="academicYear" className='text-sm text-red-500'>*</label> */}
                            <select name="role" id="role" className='border p-2 rounded-lg' onChange={handleRoleChange} required>
                                <option value="">Role</option>
                                <option value="admin">Admin</option>
                                <option value="student">Student</option>
                            </select>
                        </div>
                        {student ? <input type="rollno" name="rollno" placeholder="Roll No" className="p-3 rounded-md bg-gray-100 outline-none" required/>: ""}
                        <input type="text" name="username" placeholder="username" className="p-3 rounded-md bg-gray-100 outline-none" required/>
                        <input type="email" name="email" placeholder="Email" className="p-3 rounded-md bg-gray-100 outline-none" required/>
                        <input type="password" name="password" placeholder="password" className="p-3 rounded-md bg-gray-100 outline-none" required/>
                        <div className='flex flex-col'>
                            {/* <label htmlFor="academicYear" className='text-sm text-red-500'>*</label> */}
                            <select name="academicYear" id="academicYear" className='border p-2 rounded-lg' required>
                                <option value="">Academic Year</option>
                                <option value="2021-22">2021-22</option>
                                <option value="2022-23">2022-23</option>
                                <option value="2023-24">2023-24</option>
                                <option value="2024-25">2024-25</option>
                            </select>
                        </div>
                        <div className='flex flex-col'>
                            {/* <label htmlFor="year" className='text-sm text-red-500'>*</label> */}
                            <select name="year" id="year" className='border p-2 rounded-lg' required>
                                <option value="">Year</option>
                                <option value="BE">BE</option>
                                <option value="TE">TE</option>
                                <option value="SE">SE</option>
                                <option value="FE">FE</option>
                            </select>
                        </div>
                        <div className='flex flex-col'>
                            {/* <label htmlFor="branch" className='text-sm text-red-500'>*</label> */}
                            <select name="branch" id="branch" className='border p-2 rounded-lg' required>
                                <option value="">Branch</option>
                                <option value="IT">Information Technology</option>
                                <option value="COMP">Computer Engineering</option>
                                <option value="ENTC">Electronics And Telecommunication</option>
                                <option value="AIDS">Artificial Intelligence And Data Science</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-10">
                            <button type="submit" className="p-2 w-1/4 rounded-md bg-blue-600 text-white ">Register</button>
                            <Link to="/login"><span className="text-blue-400 cursor-pointer font-semibold">Back to Login</span></Link>
                        </div>
                        
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register;