import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Sidebar({ username = "UserName" }) {  // Default username if none provided
    const navigate = useNavigate();

    const handleChange = (event) => {
        let value = event.target.value;
        if (value) {   
            navigate(value);
        }
    };

    const firstLetter = username.charAt(0).toUpperCase(); // Get first letter

    return (
        <>
            <div className='flex flex-col items-center text-start py-2 gap-5'>
                <div className='flex flex-col gap-2 items-center border-b w-full border-gray-400'>
                    <div className='p-1 w-9 h-9 text-white rounded-full text-center bg-green-700'>
                        {firstLetter}
                    </div>
                    <div className='text-gray-500'>{username}</div>
                </div>
                <Link to="/" className='text-gray-500 border-b w-full border-gray-400 pl-3'>
                    Home
                </Link>
                <Link className='text-gray-500 border-b w-full border-gray-400 pl-3'>
                    Your Profile
                </Link>
                <Link to="/displayRecords" className='text-gray-500 border-b w-full border-gray-400 pl-3'>
                    Generated Notices Details
                </Link>
                <select name="" id="" onChange={handleChange} className='text-gray-500 border-b w-full border-gray-400 pl-2 outline-none cursor-pointer'>
                    <option value="">Customize Word File</option>
                    <option value="/customWordFileHtml">Using HTML</option>
                    <option value="/customWordFileEditor">Using Editor</option>
                </select>
                <Link to="/composeMail" className='text-gray-500 border-b w-full border-gray-400 pl-3'>
                    Compose Mail
                </Link>
            </div>
        </>
    );
}

export default Sidebar;
