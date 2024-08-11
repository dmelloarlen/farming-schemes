import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


export default function MyScheams() {

    const [data, setData] = useState();
    const [data1, setData1] = useState();
    const [formId,setFormId]=useState();
    const [isAdmin,setIsAdmin]=useState(localStorage.getItem("isAdmin")=="true")

useEffect(() => {
  const getScheam = async () => {
    try {
      const res = await axios.get(isAdmin?"https://farming-backend-ldnp.onrender.com/Applications/allapplications":
        `https://farming-backend-ldnp.onrender.com/Applications/applied/${localStorage.getItem("id")}`
      );
      const scheamId = res.data.map(item => item.scheamId); // Extract scheamId from each item in the array
      const FormId = res.data.map(item => item._id); // Extract scheamId from each item in the array
      setData(scheamId);
      setFormId(FormId)
      setTimeout(() => {
        if (scheamId) {
          const getScheam1 = async (scheamId) => {
            try {
                const scheamDetails = await Promise.all(
                    scheamId.map(async (scheamId) => {
                        // console.log(scheamId)
                      const res1 = await axios.get(
                        `https://farming-backend-ldnp.onrender.com/scheam/schem/${scheamId}`
                      );
                      console.log(res1.data)
                      return res1.data;
                    })
                  );
                setData1(scheamDetails);
                // console.log(scheamDetails)
            } catch (error) {
              console.error(error);
            }
          };
          getScheam1(scheamId);
        }
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };
  getScheam();
}, []);

  return (
    <div className={isAdmin?"container":""}>
      {isAdmin &&  <button className='my-3' onClick={()=>window.history.back()}>Go Back</button>}
       {data1 && data1.length>0 ?<table className="responsive-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th style={{textAlign:"center"}}>Status</th>
          </tr>
        </thead>
        <tbody>
          {data1 && data1.map((item, index) => (
            <tr key={index}>
              <td style={{width:"5%"}}>{index+1}</td>
              <td style={{width:"85%"}}>{item[0].title}</td>
              <td style={{textAlign:"center"}}><Link to={`../viewapplication/${formId[index]}`}>View Form</Link></td>
            </tr>
          ))}
        </tbody>
      </table>: <h2 className='d-flex justify-content-center'>no schems yet</h2>}
    </div>
  )
}
