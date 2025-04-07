import React, { useState, useEffect } from "react";

const RecentDesigns = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 2000);
  }, []);

  const designs = [
    {
      id: 1,
      title: "Sherwani",
      image:
        "https://i.pinimg.com/originals/9a/8d/6a/9a8d6a38491faff1a6d17ff4f7cdb8e7.jpg",
    },
    {
      id: 2,
      title: "Jodhpuri",
      image:
        "https://img.perniaspopupshop.com/catalog/product/n/k/NKGCM022348_1.jpg?impolicy=detailimageprod",
    },
    {
      id: 3,
      title: "Lehenga",
      image:
        "https://cdn.shopify.com/s/files/1/1732/6543/products/RedBridalLehengaPakistani_1800x1800.jpg?v=1606148986",
    },
  ];

  if (loading) {
    return (
      <section className="mb-8">
        <div className="skeleton h-8 w-48 mb-6"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {[1, 2, 3].map((index) => (
            <div key={index} className="skeleton-card">
              <div className="p-3">
                <div className="skeleton skeleton-image mb-4"></div>
                <div className="space-y-3">
                  <div className="skeleton h-5 w-24 mx-auto"></div>
                  <div className="skeleton h-4 w-20 mx-auto opacity-60"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Recent Designs</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {designs.map((design) => (
          <div
            key={design.id}
            className="bg-white shadow-md p-4 rounded-md border border-gray-200"
          >
            <img
              src={design.image}
              alt={design.title}
              className="h-80 object-cover rounded-md mb-2 "
            />
            <p className="text-center font-medium">{design.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentDesigns;
