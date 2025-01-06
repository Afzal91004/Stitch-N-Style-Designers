import React from "react";
import DashboardStats from "../components/DashboardStats.jsx";
import RecentDesigns from "../components/RecentDesigns.jsx";
import FeaturedDesigns from "../components/FeaturedDesigns.jsx";

const DesignerDashboard = () => {
  return (
    <div className="px-4 py-6 mx-auto max-w-7xl">
      <h1 className="text-2xl font-bold text-center mb-8">
        Designer Dashboard
      </h1>
      <DashboardStats />
      <RecentDesigns />
      <FeaturedDesigns />
    </div>
  );
};

export default DesignerDashboard;
