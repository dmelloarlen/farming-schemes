import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./compoents/Navbar";
import Home from "./compoents/Home";
import ViewSchem from "./compoents/ViewSchem";
import SignUp from "./compoents/SignUp";
import AddScheams from "./compoents/adminControls/AddScheams";
import ManageScheams from "./compoents/adminControls/ManageScheams";
import ApplyNow from "./compoents/ApplyNow";
import ViewApplication from "./compoents/ViewApplication";
import MyScheams from "./compoents/MyScheams";
import ApprovedScheams from "./compoents/ApprovedScheams";
import { Toaster } from "react-hot-toast";
import Test from "./compoents/Test";

function App() {
  return (
    <>
      <>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>} extact></Route>
            <Route path="/signup" element={<SignUp/>} extact></Route>
            <Route path="/viewschem/:id" element={<ViewSchem/>} extact></Route>
            <Route path="/admin/addscheams" element={<AddScheams />} extact></Route>
            <Route path="/admin/managescheams" element={<ManageScheams/>} extact></Route>
            <Route path="/admin/MyScheams" element={<MyScheams/>} extact></Route>
            <Route path="/admin/ApprovedScheams" element={<ApprovedScheams/>} extact></Route>
            <Route path="/applynow/:id" element={<ApplyNow/>} extact></Route>
            <Route path="/viewapplication/:_id" element={<ViewApplication/>} extact></Route>
            <Route path="/test" element={<Test/>} extact></Route>
          </Routes>
          <Toaster/>
        </BrowserRouter>
      </>
    </>
  );
}

export default App;
