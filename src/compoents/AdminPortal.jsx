import React from 'react'
import "../css/AdminPortal.css"
import { useNavigate } from 'react-router-dom'

export default function AdminPortal() {

    const navigate=useNavigate()

    const handleAddClick=()=>{
        navigate("/admin/addscheams")
    }


  return (
    <div>
      <div className='container d-flex justify-content-between container1'>
            <div className='p-3' style={{backgroundColor:"red",margin:"10px"}} onClick={()=>navigate("/admin/managescheams")}>
                Manage Scheams
            </div>
            <div className='p-3' style={{backgroundColor:"red",margin:"10px"}} onClick={handleAddClick}>
                Add Scheam
            </div>
      </div>
      <div className='container d-flex justify-content-between container1'>
            <div className='p-3' style={{backgroundColor:"red",margin:"10px"}} onClick={()=>navigate("/admin/MyScheams")}>
                Applications
            </div>
            <div className='p-3' style={{backgroundColor:"red",margin:"10px"}} onClick={()=>navigate("/admin/ApprovedScheams")}>
                Approved Scheams
            </div>
      </div>
    </div>
  )
}
