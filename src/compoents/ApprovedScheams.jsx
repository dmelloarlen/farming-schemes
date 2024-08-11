import React, { useEffect, useState } from 'react'
import "../css/AllScheams.css"
import { Link } from 'react-router-dom';
import axios from 'axios';
import tickIcon from "../images/ticked.png"

export default function ApprovedScheams() {

  const [data,setData]=useState();
  const [isAdmin,setIsAdmin]=useState(localStorage.getItem("isAdmin")=="true");


  useEffect(()=>{
    const getApproved=async()=>{
      try {
        const res=await axios.get(!isAdmin?`https://farming-backend-ldnp.onrender.com/approved/approvedapp/${localStorage.getItem("id")}`:"https://farming-backend-ldnp.onrender.com/approved/approvedapp")
        setData(res.data)
        // console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getApproved()
  },[])

  return (
    <div className={isAdmin?"container mt-3":""}>
       {data && data.length>0 ?<table className="responsive-table">
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Name</th>
            <th style={{textAlign:"center"}}>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td style={{width:"5%"}}>{index+1}.</td>
              <td style={{width:"85%"}}>{localStorage.getItem("isAdmin")?`${item.fname}(${item.scheam})`:item.scheam}</td>
              <td style={{textAlign:"center"}}><img src={tickIcon} width={"40px"}/></td>
            </tr>
          ))}
        </tbody>
      </table>: <h2 className='d-flex justify-content-center'>no schems yet</h2>}
    </div>
  )
}
