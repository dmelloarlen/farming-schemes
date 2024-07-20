import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function ViewSchem() {

    const [content,setContent]=useState([])

    const Navigate=useNavigate()
    const a=useParams()
    console.log(a.id)

    useEffect(() => {
        const getContent = async () => {
          try {
            const res = await axios.get(
              `http://localhost:4000/scheam/schem/${a.id}`
            );
            setContent(res.data[0]);
        } catch (error) {
            console.error(error);
        }
    };
    getContent();
}, []);
console.log(content)

  const handlePrintClick = () => {
    var printContents = document.getElementById("a").innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload()
  };
  return (
    <div>
      <div className="container mt-3 borde border-dark ">
        <div className="container borde border-dark" id="a">
          <div className="border-bottom border-dark pb-2 text-center">
            <h2>
              <strong>Farming Scheams Application</strong>
            </h2>
          </div>
          {true && <>
            <div className="container text-center mt-5 mb-5">
                    <h5 className="text-break"><strong>{content.title} </strong></h5>
            </div>
            <div className="text-break">{content.description}</div>
          </>}
        </div>
        <div className="d-flex justify-content-end mt-5">
          <button onClick={()=>Navigate('/')} className="me-3">
            Go Back
          </button>
          <button onClick={handlePrintClick} className="me-3">
            Print
          </button>
          {localStorage.getItem("isAdmin")==="false" && localStorage.getItem("state")==="true" &&
            <button onClick={()=>Navigate(`/applynow/${a.id}`)} className="me-3">
                Apply Now
            </button>
          }
        </div>
      </div>
    </div>
  );
}
