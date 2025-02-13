import React from "react";

const RecentDesigns = () => {
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
