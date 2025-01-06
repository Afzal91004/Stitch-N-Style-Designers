import React from "react";

const RecentDesigns = () => {
  const designs = [
    { id: 1, title: "Summer Dress", image: "design1.jpg" },
    { id: 2, title: "Evening Gown", image: "design2.jpg" },
    { id: 3, title: "Casual Shirt", image: "design3.jpg" },
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
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <p className="text-center font-medium">{design.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentDesigns;
