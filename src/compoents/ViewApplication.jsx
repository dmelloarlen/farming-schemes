import React, { useState, useEffect } from 'react';
import "../css/ViewApplication.css"
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
const ViewApplication = () => {
  const [data, setData] = useState([]);

  const a=useParams()
  const Navigate=useNavigate()

  useEffect(()=>{
    const getApplication=async()=>{
      try {
        const res=await axios.get(`http://localhost:4000/Applications/myapplication/${a._id}`);
        setData(res.data['0'])
        console.log(res.data['0'])
      } catch (error) {
        console.log(error)
      }
    }
    getApplication();
  },[])


  const handleDeleteClick=async()=>{
    if (window.confirm("Are you shure want to delete the application!!")) {
      try {
        const res=await axios.delete(`http://localhost:4000/Applications/myapplication/${a._id}`);
        if (res) {
          toast.success("Application Deleted Sucessfully!!");  
          Navigate('/')          
        }else{
          toast.error("Invalid scheam ID!!")
        }
      } catch (error) {
        console.log(error)
      } 
    }
  }

  const handleApproveClick=async()=>{
    try {
      const res=await axios.post("http://localhost:4000/approved/setapproved",data)
      if (res) {
        toast.success("Application approved")
        const res1=await axios.delete(`http://localhost:4000/Applications/myapplication/${a._id}`);
        Navigate('/')
      }
    } catch (error) {
      toast.error("You have applied for this scheam already!!")
    }
  }

  const handlePrintClick = () => {
    var printContents = document.getElementById("a").innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload()
  };

  return (
    <div className="container border mt-3">
      {data && <div id='a'>
        <div className="row">
            <div className="column">
                <span >
                  {data.photo &&
                    <img src={require(`../images/${data.photo}`)} width="100px"/>
                  }
                </span>
            </div>
            <div className="column d-flex align-items-center">
              <h2>Application later</h2>
            </div>
        </div>
        <hr className='m-0 border border-dark'/>
        <div className="row">
            <div className="column">
              <span className="label">Full name:</span>
              <span className="value">{data.fname}</span>
            </div>
            <div className="column">
              <span className="label">Email:</span>
              <span className="value">{data.email}</span>
            </div>
            <div className="column">
              <span className="label">Age</span>
              <span className="value">{data.age}</span>
            </div>
        </div>
        <div className="row">
            <div className="column">
              <span className="label">Contact no.:</span>
              <span className="value">{data.contact}</span>
            </div>
            <div className="column">
              <span className="label">Tel no.:</span>
              <span className="value">{data.tel}</span>
            </div>
            <div className="column">
              <span className="label">Plot no.:</span>
              <span className="value">{data.plotNo}</span>
            </div>
        </div>
        <div className="row">
            <div className="column">
              <span className="label">Land area:</span>
              <span className="value">{data.larea}</span>
            </div>
            <div className="column">
              <span className="label">Pan card no.:</span>
              <span className="value">{data.panNo}</span>
            </div>
            <div className="column">
              <span className="label">Annule incom:</span>
              <span className="value">{data.incom}</span>
            </div>
        </div>
        <div className="row">
            <div className="column">
              <span className="label">Applied scheam name:</span>
              <span className="value d-flex" style={{textAlign:"start"}}>{data.scheam}</span>
            </div>
            <div className="column">
              <span className="label">Reciptents Address:</span>
              <br/>
              <span className="value">{data.address}</span>
            </div>
        </div>
        <hr className='m-0 border border-dark'/>
        <div className="row">
              <div>
                <p className="mb-1">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Dolorem, optio? Magnam mollitia nihil illum excepturi quis
                  tempore neque facere deleniti in, quos, obcaecati omnis commodi,
                  animi at. Porro, ducimus sapiente? Nemo exercitationem
                  dignissimos velit ipsam fugiat blanditiis minus inventore
                  pariatur eius, reiciendis a eveniet autem.ws
                </p>
                <label>
                  I aggrie all above terms and conditions:
                  <input type="checkbox" checked/>
                </label>
                <br />
                <label>
                  I aggrie all above terms and conditions:
                  <input type="checkbox" checked/>
                </label>
              </div>
        </div>
        </div>}
            <div className="d-flex justify-content-end mt-3">
              <button type="button" onClick={()=>Navigate('/')}>Go Back</button>
              <button type="button" onClick={handlePrintClick}>Print</button>
              {
                localStorage.getItem("isAdmin")=="false"?<button type="button" onClick={handleDeleteClick}>Delete Application</button>:<button type="button" onClick={handleApproveClick}>Approve Application</button> 
              }
            </div>
    </div>
  );
};

export default ViewApplication;
