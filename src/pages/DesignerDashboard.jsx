import React from "react";
import DashboardStats from "../components/DashboardStats.jsx";
import RecentDesigns from "../components/RecentDesigns.jsx";
import FeaturedDesigns from "../components/FeaturedDesigns.jsx";
import "../styles/DesignerDashboard.css";

const DesignerDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Designer Dashboard</h1>
      <DashboardStats />
      <RecentDesigns />
      <FeaturedDesigns />
    </div>
  );
};

export default DesignerDashboard;
