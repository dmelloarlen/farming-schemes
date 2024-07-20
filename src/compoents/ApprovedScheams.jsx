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
        const res=await axios.get(!isAdmin?`http://localhost:4000/approved/approvedapp/${localStorage.getItem("id")}`:"http://localhost:4000/approved/approvedapp")
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
            <th>Image</th>
            <th>Name</th>
            <th style={{textAlign:"center"}}>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td style={{width:"5%"}}>{index+1}</td>
              <td style={{width:"85%"}}>{item.scheam}</td>
              <td style={{textAlign:"center"}}><img src={tickIcon} width={"40px"}/></td>
            </tr>
          ))}
        </tbody>
      </table>: <h1>no schems yet</h1>}
    </div>
  )
}
