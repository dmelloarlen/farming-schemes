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
            const res=await axios.post("http://localhost:4000/scheam/addscheam",scheamAdd);
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
      <div className="container">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Title"
            className="title1"
            {...register("title", { required: true })}
          />
          <br />
          {errors.title && (
            <span style={{ fontSize: "small", color: "red" }}>
              This field is required!
            </span>
          )}
          <hr style={{ border: "2px solid red" }} />
          <br />
          {/* <input type='text' placeholder='Description'  {...register("disc", { required: true })}/> */}
          <textarea
            className="disc1"
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
          <button type="submit" className="addButton">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
