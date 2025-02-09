import React, { useEffect,useState } from 'react';
import { fetchData } from '../api';
import {Link} from 'react-router-dom';
import './style.css'
import Loader from './loader'

function Display(){
    const [data,setData]=useState([]);
    useEffect(()=>{
        fetchData('records').then((data) => setData(data));
    });
      
    return(
        <div className="w-full h-full">
        <table className="w-full table-fixed divide-y divide-gray-200">
            <thead className="bg-white divide-y divide-gray-200">
            <tr>
                <th className="w-1/12 px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase border">Sr. No</th>
                <th className="w-2/12 px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase border">Academic Year</th>
                <th className="w-1/12 px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase border">Year</th>
                <th className="w-3/12 px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase border">Branch</th>
                <th className="w-2/12 px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase border">Word File</th>
                <th className="w-2/12 px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase border">Excel File</th>
                <th className="w-1/12 px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase border">Delete</th>
            </tr>
            </thead>
        </table>
        
        <div className="w-full h-[90%] overflow-scroll class">
            <table className="w-full table-fixed divide-y divide-gray-200">
            <tbody className="bg-white divide-y divide-gray-200">
                {
                    data.length>0 ?
                    <>
                        {data.map((item, index) => (
                        <tr key={index}>
                            <td className="w-1/12 px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase border">{index + 1}</td>
                            <td className="w-2/12 px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase border">{item.academicYear}</td>
                            <td className="w-1/12 px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase border">{item.year}</td>
                            <td className="w-3/12 px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase border">{item.branch}</td>
                            <td className="w-2/12 px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase border">{item.wordFile}</td>
                            <td className="w-2/12 px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase border">{item.excelFile}</td>
                            <td className="w-1/12 px-1 py-1 text-left text-xs font-medium uppercase border text-white">
                            <form action={`/api/data/deleteRecord/${item.id}`} method="POST">
                                <button type="submit" className="bg-red-600 p-1.5 rounded-md text-xs">
                                Delete
                                </button>
                            </form>
                            </td>
                        </tr>
                        ))}
                    </>
                    : <Loader/>
                }
                
               
            </tbody>
            </table>
        </div>
        </div>

      
    
    );

}

export default Display;