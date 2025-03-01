import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayoutBasic from "../components/DashboardLayoutBasic";

const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login"); // Redirect to login if no token found
    }
  }, [token, navigate]);

  return token ? <DashboardLayoutBasic token={token} /> : null;
};

export default Dashboard;
