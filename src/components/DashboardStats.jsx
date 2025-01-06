import React from "react";

const DashboardStats = () => {
  const stats = [
    { label: "Total Designs", value: 120 },
    { label: "Featured Designs", value: 45 },
    { label: "Orders Received", value: 320 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white shadow-md p-4 rounded-md text-center border border-gray-200"
        >
          <p className="text-lg font-bold">{stat.value}</p>
          <p className="text-gray-500">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
