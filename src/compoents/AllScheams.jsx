import React, { useEffect, useState } from 'react'
import "../css/AllScheams.css"
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function AllScheams() {

    const [data,setData]=useState()

    useEffect(() => {
        const getScheam = async () => {
          try {
            const res = await axios.get(
              `http://localhost:4000/scheam/allschems`
            );
            setData(res.data);
          } catch (error) {
            console.error(error);
          }
        };
        getScheam();
      }, []);
    //   console.log(data)
  return (
    <div>
        {data && data.length>0 ?<table className="responsive-table">
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Name</th>
            <th style={{textAlign:"center"}}>View</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td style={{width:"5%"}}>{index+1}.</td>
              <td style={{width:"85%"}}>{item.title}</td>
              <td style={{textAlign:"center"}}><Link to={`/viewschem/${item._id}`}>View!</Link></td>
            </tr>
          ))}
        </tbody>
      </table>: <h2 className='d-flex justify-content-center'>no schems yet</h2>}
    </div>
  )
}
