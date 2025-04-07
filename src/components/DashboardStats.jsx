import React, { useState, useEffect } from "react";

const DashboardStats = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1500);
  }, []);

  const stats = [
    { label: "Total Designs", value: 120 },
    { label: "Featured Designs", value: 45 },
    { label: "Orders Received", value: 320 },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[1, 2, 3].map((index) => (
          <div key={index} className="skeleton-card p-6">
            <div className="space-y-4">
              <div className="skeleton h-8 w-24 mx-auto rounded-full"></div>
              <div className="skeleton h-5 w-32 mx-auto"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

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
