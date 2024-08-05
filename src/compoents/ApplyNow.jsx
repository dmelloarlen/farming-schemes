import axios from "axios";
import React, { useEffect, useState } from "react";
import "../css/ApplyNow.css";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function ApplyNow() {
  const [image, setImage] = useState();
  const [currentImage, setCurrentImage] = useState();
  const [data1, setData1] = useState();

  const currentDate = new Date().toDateString();
  const sid = useParams();
  const navigate=useNavigate()
  const fileInputRef = React.createRef();

  useEffect(()=>{
    const getScheam1 = async () => {
      try {
            const res1 = await axios.get(`http://localhost:4000/scheam/schem/${sid.id}`);
            setData1(res1.data);
            console.log(data1)
          } catch (error) {
            console.error(error);
          }
        };
        getScheam1()
      },[])
      console.log(data1?data1[0].title:"null")

  const onImageChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };
  const handleImageSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    console.log(formData);
    const res = await axios.post("http://localhost:4000/upimg", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res) {
      setTimeout(() => {
        setCurrentImage(res.data.fname.filename);
        console.log(res.data.fname.filename);
      }, 1000);
    }
  };
  console.log(currentImage);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    // e.preventDefault()
    console.log(data.larea)
   if(currentImage && data1){ 
    console.log(data1["0"].title)
        const applicationAdd = {
        userId: localStorage.getItem("id"),
        scheamId: sid.id,
        fname: `${data.fname} ${data.mname} ${data.lname}`,
        age: data.age,
        contact: data.contact,
        email:data.email,
        tel: data.tel,
        larea:data.larea,
        plotNo:data.plotNo,
        panNo:data.panNo,
        incom:data.incom,
        commo:data.commo,
        address: data.address,
        scheam: data1["0"].title,
        date: currentDate,
        photo: currentImage || "null",
        };
        try {
        const res = await axios.post(
            "http://localhost:4000/Applications/apply",
            applicationAdd
        );
        if (res.data) {
            toast.success("Registration sucessfull!");
            navigate("/")
        }
        } catch (error) {
        toast.error(error.response.data.message);
        }
    }else{
        toast.error("Photo not found")
    }
  };

  const triggerFileInputClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <div className="container mt-3">
      <form onSubmit={handleImageSubmit}>
        <div className="image-container" onClick={triggerFileInputClick} style={currentImage?{border:"none"}:{border:"2px solid black"}}>
          {currentImage ? (
            <img src={require(`../images/${currentImage}`)} alt="Profile" />
          ) : (
            <p>Click to select an image</p>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={onImageChange}
            accept="image/*"
            style={{ display: 'none' }}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
        <form onSubmit={handleSubmit(onSubmit)}>
          <hr />
          <section>
            <div className="form-pd">
              <div>
                <label>
                  First Name:
                  <br />
                  <input
                    type="text"
                    placeholder="First name"
                    
                    {...register("fname", { required: true })}
                  />
                  <br />
                  {errors.fname && (
                    <span style={{ fontSize: "small", color: "red" }}>
                      This field is required!
                    </span>
                  )}
                </label>
              </div>
              <div className="d-fl">
                <label>
                  Middle Name:
                  <br />
                  <input
                    type="text"
                    placeholder="Middle name"
                    
                    required
                    {...register("mname", { required: true })}
                  />
                  <br />
                  {errors.mname && (
                    <span style={{ fontSize: "small", color: "red" }}>
                      This field is required!
                    </span>
                  )}
                </label>
              </div>
              <div className="d-fl">
                <label>
                  Last Name:
                  <br />
                  <input
                    type="text"
                    placeholder="Last name"
                    
                    required
                    {...register("lname", { required: true })}
                  />
                  <br />
                  {errors.lname && (
                    <span style={{ fontSize: "small", color: "red" }}>
                      This field is required!
                    </span>
                  )}
                </label>
              </div>
            </div>
            <div className="form-pd">
              <div>
                <label>
                  Age:
                  <br />
                  <input
                    type="number"
                    placeholder="Age"
                    
                    required
                    {...register("age", { required: true })}
                  />
                  <br />
                  {errors.age && (
                    <span style={{ fontSize: "small", color: "red" }}>
                      This field is required!
                    </span>
                  )}
                </label>
              </div>
              <div className="d-fl">
                <label>
                  Contact no.:
                  <br />
                  <input
                    type="number"
                    placeholder="Contact no."
                    
                    required
                    {...register("contact", { required: true })}
                  />
                  <br />
                  {errors.contact && (
                    <span style={{ fontSize: "small", color: "red" }}>
                      This field is required!
                    </span>
                  )}
                </label>
              </div>
              <div className="d-fl">
                <label>
                  Email ID:
                  <br />
                  <input
                    type="email"
                    placeholder="Email ID"
                    
                    required
                    {...register("email", { required: true })}
                  />
                  <br />
                  {errors.email && (
                    <span style={{ fontSize: "small", color: "red" }}>
                      This field is required!
                    </span>
                  )}
                </label>
              </div>
            </div>
            <div className="form-pd">
              <div className="d-fl">
                <label>
                  Tel no.:
                  <br />
                  <input
                    type="number"
                    placeholder="Tel no."
                    
                    {...register("tel")}
                  />
                </label>
              </div>
              <div>
                <label>
                  Land area(in sq.m):
                  <br />
                  <input
                    type="number"
                    placeholder="Land area"
                    
                    required
                    {...register("larea", { required: true })}
                  />
                  <br />
                  {errors.larea && (
                    <span style={{ fontSize: "small", color: "red" }}>
                      This field is required!
                    </span>
                  )}
                </label>
              </div>
              <div className="d-fl">
                <label>
                  Plot no.:
                  <br />
                  <input
                    type="number"
                    placeholder="Plot no."
                    
                    required
                    {...register("plotNo", { required: true })}
                  />
                  <br />
                  {errors.plotNo && (
                    <span style={{ fontSize: "small", color: "red" }}>
                      This field is required!
                    </span>
                  )}
                </label>
              </div>
            </div>
            <div className="form-pd">
              <div className="d-fl">
                <label>
                  Pan chard no.:
                  <br />
                  <input
                    type="text"
                    placeholder="Pan chard no."
                    
                    required
                    {...register("panNo", { required: true })}
                  />
                  <br />
                  {errors.panNo && (
                    <span style={{ fontSize: "small", color: "red" }}>
                      This field is required!
                    </span>
                  )}
                </label>
              </div>
              <div>
                <label>
                  Annule incom:
                  <br />
                  <select style={{width:"200px",padding:"3px",cursor:"pointer"}}  required {...register("incom", { required: true })}>
                    <option>&#8377; 0-1 LPA</option>
                    <option>&#8377; 1-3 LPA</option>
                    <option>&#8377; 3-5 LPA</option>
                    <option>&#8377; 5 or more LPA</option>
                  </select>
                  <br />
                  {errors.incom && (
                    <span style={{ fontSize: "small", color: "red" }}>
                      This field is required!
                    </span>
                  )}
                </label>
              </div>
              <div>
                <label>
                  Commodities:
                  <br />
                  <select style={{width:"200px",padding:"3px",cursor:"pointer"}} placeholder="Select"  {...register("commo", { required: true })}>
                    <option>Cereal Crops</option>
                    <option>Legume Crops</option>
                    <option>Oilseed Crops</option>
                    <option>Other</option>
                  </select>
                  <br />
                  {errors.commo && (
                    <span style={{ fontSize: "small", color: "red" }}>
                      This field is required!
                    </span>
                  )}
                </label>
              </div>
            </div>
            <div className="form-pd">
              <div>
                <label>
                  Address:
                  <br />
                  <textarea
                    cols={30}
                    rows={3}
                    placeholder="Enter Your Current Address"
                    
                    required
                    {...register("address", { required: true })}
                  />
                  <br />
                  {errors.address && (
                    <span style={{ fontSize: "small", color: "red" }}>
                      This field is required!
                    </span>
                  )}
                </label>
              </div>
            </div>
          </section>
          <hr />
          <section>
            <div>
              <p className="mb-1">
              I hereby affirm that the information I have provided in this form is accurate and truthful to the best of my knowledge. I understand and acknowledge that if any part of the information I have provided is found to be incorrect or misleading, I will bear full responsibility for any consequences that may arise. Furthermore, I agree to accept any disciplinary actions or penalties that may be imposed as a result of providing false or inaccurate information.
              </p>
              <label>
              I have read the above statement and agree to its terms and conditions.
                <input type="checkbox" onChange={(e)=>console.log(e.eventPhase)} required/>
              </label>
            </div>
          </section>
          <div className="d-flex justify-content-end mt-3">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
