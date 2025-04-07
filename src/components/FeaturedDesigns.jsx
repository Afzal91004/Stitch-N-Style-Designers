import React, { useState, useEffect } from "react";

const FeaturedDesigns = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1800);
  }, []);

  if (loading) {
    return (
      <section>
        <div className="skeleton h-8 w-48 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((index) => (
            <div key={index} className="skeleton-card p-4">
              <div className="flex items-start space-x-4">
                <div className="skeleton w-32 h-32 rounded-lg flex-shrink-0"></div>
                <div className="flex-1 space-y-3 py-1">
                  <div className="skeleton h-5 w-3/4"></div>
                  <div className="skeleton h-4 w-1/2"></div>
                  <div className="skeleton h-4 w-2/3"></div>
                  <div className="skeleton h-4 w-1/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Featured Designs</h2>
      <div className="text-gray-500 text-center py-4">
        No featured designs yet. Add some to highlight your best work!
      </div>
    </section>
  );
};

export default FeaturedDesigns;
