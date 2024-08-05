import React, { useEffect, useState } from "react";
import "../css/Navbar.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import userIcon from "../images/userIcon.png"
import axios from "axios";
import toast from "react-hot-toast";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [logedin, setLogedin] = useState(localStorage.getItem("state")=="true"?true:false);
  const [user,setUser]=useState()
  const Navigate = useNavigate();

  const togglePopup = (e) => {

    if (!logedin) {
        setIsOpen(!isOpen);   
    } else {
        toast.success("Logout sucessfull")
        localStorage.removeItem("id")
        localStorage.setItem("state",false)
        setLogedin(false)
        setTimeout(() => {
            Navigate('/') 
            window.location.reload()
        }, 700);
    }
  };

      useEffect(()=>{
          const getuser=async()=>{
            try {
                const res=await axios.get(`http://localhost:4000/user1/getuser/${localStorage.getItem("id")}`);
                setUser(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getuser()
    },[])
    // console.log(user)

  useEffect(() => {
    localStorage.setItem("popup", isOpen);
  }, [isOpen]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async(data) =>{
    // console.log(data)
    const userInfo = {
      email: data.email,
      password: data.password,
    }
    try {
      const res = await axios.post("http://localhost:4000/user1/login", userInfo);
      if(res.data) {
          toast.success("Login successfull!")
          setLogedin(true)
          localStorage.setItem("state",true)
          localStorage.setItem("id",res.data.user._id)
          localStorage.setItem("isAdmin",res.data.user.isadmin)
          setIsOpen(false)
          window.location.reload()
      }
    } catch (error) {
        toast.error("Invlid Email or Password")
    }
  };
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-left">
          <img
            src={userIcon}
            alt="Profile Picture"
            className="profile-picture"
          />
          {user && localStorage.getItem("id") &&
              <span className="profile-name">{user.name}</span>
          }
        </div>
        <div className="navbar-right">
          <button className="login-button" onClick={togglePopup}>
          {logedin ? "Logout" : "Login"}
          </button>
        </div>
      </nav>
      {isOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="close-popup-button" onClick={togglePopup}>
              &times;
            </div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                <input type="email" placeholder="Email" className='input' {...register("email", { required: true })}/>
                  <br />
                  {errors.email && <span style={{fontSize:"small",color:"red"}}>This field is required!</span>}
                </div>
                <div className="form-group">
                <input type="password" placeholder="Password" className='input' id='showPass'{...register("password", { required: true })}/>
                  <br/>
                  {errors.password && <span style={{fontSize:"small",color:"red"}}>This field is required!</span>}
                </div>
              Want to signup?
              <Link className="signup-buttom" to={'/signup'} onClick={()=>setIsOpen(false)}>
                Signup
              </Link>
              <button type="submit" className="login-button mt-3">
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
