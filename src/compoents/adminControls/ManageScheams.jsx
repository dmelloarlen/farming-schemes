import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';


export default function ManageScheams() {
    const [data,setData]=useState()

    const Navigate=useNavigate()

    useEffect(() => {
        const getScheam = async () => {
          try {
            const res = await axios.get(
              `https://farming-backend-ldnp.onrender.com/scheam/allschems`
            );
            setData(res.data);
          } catch (error) {
            console.error(error);
          }
        };
        getScheam();
      }, []);

      const handleDeleteClick=async(id)=>{
        if (window.confirm("Are you sure want to delete the scheam?")) {
            try {
                const res = await axios.delete(
                  `https://farming-backend-ldnp.onrender.com/scheam/schem/${id}`
                );
                toast.success("Scheam deleted sucessfully!!");
                window.location.reload()
            } catch (error) {
                console.error(error);
    
            } 
        }
      }
  return (
    <div>
        <div className='container'>
            <button className='my-3' onClick={()=>window.history.back()}>Go Back</button>
        {data && data.length>0 ?<table className="responsive-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th style={{textAlign:"center"}}>View</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((item, index) => (
            <tr key={index}>
              <td style={{width:"5%"}}>{index+1}</td>
              <td style={{width:"85%"}}>{item.title}</td>
              <td style={{textAlign:"center"}}><Link to={`/viewschem/${item._id}`}>View!</Link></td>
              <td style={{textAlign:"center"}}><button type='button' onClick={()=>handleDeleteClick(item._id)} style={{}}><i className="fas fa-trash"></i></button></td>
            </tr>
          ))}
        </tbody>
      </table>: <h1>no schems yet</h1>}
        </div>
    </div>
  )
}
