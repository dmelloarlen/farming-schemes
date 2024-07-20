import React, { useState } from "react";
import "../css/Home.css";
import AllScheams from "./AllScheams";
import MyScheams from "./MyScheams";
import ApprovedScheams from "./ApprovedScheams";
import AdminPortal from "./AdminPortal";

export default function Home() {
  const [activeTab, setActiveTab] = useState("all");
  const [logedin, setLogedin] = useState(
    localStorage.getItem("state") == true ? true : false
  );

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="container">
        <div className="tabs">
          <div
            className={`tab ${activeTab === "all" ? "active" : ""}`}
            onClick={() => handleTabClick("all")}
          >
            All Schemes
          </div>
          {localStorage.getItem("state") === "true" && localStorage.getItem("isAdmin") === "false" && (
            <>
              <div
                className={`tab ${activeTab === "applied" ? "active" : ""}`}
                onClick={() => handleTabClick("applied")}
              >
                My Applied Schemes
              </div>
              <div
                className={`tab ${activeTab === "status" ? "active" : ""}`}
                onClick={() => handleTabClick("status")}
              >
                Approved Schemes
              </div>
            </>
          )}
              {localStorage.getItem("state") === "true" && localStorage.getItem("isAdmin") === "true" && (
                <div
                  className={`tab ${activeTab === "admin" ? "active" : ""}`}
                  onClick={() => handleTabClick("admin")}
                >
                  Admin Portal
                </div>
              )}
        </div>
        <div
          className={`tab-content ${activeTab === "all" ? "active" : ""}`}
          id="all"
        >
          <AllScheams />
        </div>
        <div
          className={`tab-content ${activeTab === "applied" ? "active" : ""}`}
          id="applied"
        >
          <MyScheams />
        </div>
        <div
          className={`tab-content ${activeTab === "status" ? "active" : ""}`}
          id="status"
        >
          <ApprovedScheams />
        </div>
        <div
          className={`tab-content ${activeTab === "admin" ? "active" : ""}`}
          id="admin"
        >
          <AdminPortal />
        </div>
      </div>
    </div>
  );
}
