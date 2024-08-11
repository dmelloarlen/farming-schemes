import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export default function AddScheams() {

    const navigate=useNavigate()
    const currentDate = new Date().toDateString();

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      const onSubmit=async(data)=>{
        const scheamAdd={
            title:data.title,
            description:data.description,
            date:currentDate
        }
        try{
            const res=await axios.post("https://farming-backend-ldnp.onrender.com/scheam/addscheam",scheamAdd);
            if(res.data){
                toast.success("Scheam added sucessfully")
                navigate("/")
            }
        }catch(error){
            toast.error(error.response.data.message)
        }
      };
  return (
    <div>
      <div className="container border mt-3">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Scheam name"
            className="title1 w-100 py-2"
            style={{fontSize:"25px"}}
            {...register("title", { required: true })}
          />
          <br />
          {errors.title && (
            <span style={{ fontSize: "small", color: "red" }}>
              This field is required!
            </span>
          )}
          <hr style={{ border: "2px solid red" }} />
          <textarea
            className="w-100"
            placeholder="Enter the description here...."
            rows="10"
            {...register("description", { required: true })}
          />
          {errors.description && (
            <span style={{ fontSize: "small", color: "red" }}>
              This field is required!
            </span>
          )}
          <br />
          <div className="d-flex justify-content-end fs-5">
            <button type="submit">
              Add Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
