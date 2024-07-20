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
            toast.success("Note added sucessfully");
            navigate("/")
        }
        } catch (error) {
        toast.error(error.response.data.message);
        }
    }else{
        toast.error("Photo not found")
    }
  };
  return (
    <div>
      <div className="container mt-3">
        <form onSubmit={handleImageSubmit}>
          <span className="d-flex" style={{ width: "8%", height: "108px", border: "2px solid red" }}>
          {currentImage ? <img src={require(`../images/${currentImage}`)} style={{width:"100%"}}/>:<input type="file" onChange={onImageChange} required/>}
          </span>
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
                    className="m-"
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
                    className="m-"
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
                    className="m-"
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
                    placeholder="First name"
                    className="m-"
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
                    type="text"
                    placeholder="Middle name"
                    className="m-"
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
                    type="text"
                    placeholder="Last name"
                    className="m-"
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
                    type="text"
                    placeholder="Last name"
                    className="m-"
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
                    placeholder="First name"
                    className="m-"
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
                    type="text"
                    placeholder="Middle name"
                    className="m-"
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
                    placeholder="Last name"
                    className="m-"
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
                    <option>$ 1-3 LPA</option>
                    <option>$ 3-5 LPA</option>
                    <option>$ 5-8 LPA</option>
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
                    <option>Crops</option>
                    <option>Crops</option>
                    <option>Crops</option>
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
                    placeholder="First name"
                    className="m-"
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
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Dolorem, optio? Magnam mollitia nihil illum excepturi quis
                tempore neque facere deleniti in, quos, obcaecati omnis commodi,
                animi at. Porro, ducimus sapiente? Nemo exercitationem
                dignissimos velit ipsam fugiat blanditiis minus inventore
                pariatur eius, reiciendis a eveniet autem.ws
              </p>
              <label>
                I aggrie all above terms and conditions:
                <input type="checkbox" required/>
              </label>
              <br />
              <label>
                I aggrie all above terms and conditions:
                <input type="checkbox" required/>
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
