import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useForm} from "react-hook-form"
import axios from "axios"
import toast from "react-hot-toast"
import bcryptjs from "bcryptjs"

export default function SignUp() {
    const navigate = useNavigate();

    const [code,setCode]=useState(false)
    const [isAdmin,setIsAdmin]=useState(false)

    // localStorage.setItem("isSignup",true)

    
    window.addEventListener('popstate', () => {
        localStorage.removeItem("isPopup")
        navigate("/")
    });
    
    const togglePass=()=> {
        const passwordInput = document.getElementById('showPass');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
        } else {
          passwordInput.type = 'password';
      }
    };


    const handleAdmin=async()=>{
        const aid=document.getElementById("aid")
        const hash=await bcryptjs.compare(aid.value,"$2a$10$74EMPXWHCudSkIXYz2ub6eMpmAqxkavSNYYmAY1w303Fp23GRAG4C")
        if (hash) {
            toast.success("Valid admin code")
            setIsAdmin(true)
        } else {
            toast.error("Invalid admin code")
        }
    }
    
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      const onSubmit = async(data) =>{
        const userInfo = {
          name: data.name,
          phone:data.phone,
          email: data.email,
          password: data.password,
          isadmin:isAdmin
        }
        try {
          const res = await axios.post("https://farming-backend-ldnp.onrender.com/user1/signup", userInfo);
          if(res.data) {
              toast.success("Signup successfull!")
              localStorage.removeItem("isPopup")
              setTimeout((async)=>{
                navigate("/");
              },500)
          }
        } catch (error) {
            toast.error(error.response.data.message)
        }
      };
    
      return (
        <div>
            <div className="container mt-5 d-flex justify-content-center">
              <form className='form1 border' onSubmit={handleSubmit(onSubmit)}>
                  <h1>Register</h1>
                  <input type="text" placeholder="Enter name" className='input' {...register("name", { required: true })}/>
                  <br />
                  {errors.name && <span style={{fontSize:"small",color:"red"}}>This field is required!</span>}
                  <br />

                  <input type="number" placeholder="Phone" className='input' {...register("phone", { required: true })}/>
                  <br />
                  {errors.phone && <span style={{fontSize:"small",color:"red"}}>This field is required!</span>}
                  <br />

                  <input type="email" placeholder="Email" className='input' {...register("email", { required: true })}/>
                  <br />
                  {errors.email && <span style={{fontSize:"small",color:"red"}}>This field is required!</span>}
                  <br />

                  <input type="password" placeholder="Password" className='input' id='showPass'{...register("password", { required: true })}/>
                  <br/>
                  {errors.password && <span style={{fontSize:"small",color:"red"}}>This field is required!</span>}
                  <br/>
                  <label style={{marginTop:"3px"}}>
                    Show password 
                    <input type="checkbox" className='cinput' style={{cursor:"pointer"}} onClick={togglePass}/>
                  </label>
                  <br />
                  <label style={{marginTop:"3px"}}>
                    Are you a admin? 
                    <input type="checkbox" className='cinput' style={{cursor:"pointer"}} onClick={(e)=>e.target.checked?setCode(true):setCode(false)}/>
                  </label>
                  <br />
                 {code && <div>
                    <input type="text" id="aid" placeholder="Admin code"/>
                    <button type="button" onClick={handleAdmin}>Check</button>
                  </div>
                }
                <button type="submit" className='submitButton'>Submit</button>
              </form>
            </div>
        </div>
      )
}
