import React, { useState, useEffect } from "react";

const NewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [price, setPrice] = useState("");
  const [progress, setProgress] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Move fetchOrders outside of useEffect
  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/designer/custom-orders`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Add authentication headers if required
          },
          credentials: "include", // Add credentials to match other fetch calls
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      // Ensure data is an array
      setOrders(Array.isArray(data) ? data : data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]); // Set to empty array to prevent map error
    }
  };

  // Initial fetch when component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  const handleAcceptOrder = async (orderId, price) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/designer/custom-orders/${orderId}/accept`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ price }),
          credentials: "include",
        }
      );

      if (response.ok) {
        fetchOrders();
        setSelectedOrder(null);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  const handleUpdateProgress = async (orderId, progress) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/designer/custom-orders/${orderId}/progress`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ progress }),
          credentials: "include",
        }
      );

      if (response.ok) {
        fetchOrders();
        setSelectedOrder(null);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      pending: "bg-yellow-500",
      accepted: "bg-blue-500",
      in_progress: "bg-purple-500",
      completed: "bg-green-500",
      cancelled: "bg-red-500",
    };
    return colors[status] || "bg-gray-500";
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Custom Orders Dashboard
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white border rounded-lg shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="px-6 py-4 border-b flex justify-between items-center">
                  <h3 className="text-lg font-semibold">
                    Order #{order._id.slice(-6)}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs text-white ${getStatusBadgeColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="p-6">
                  <div className="space-y-2">
                    <p>
                      <strong>Style:</strong> {order.design.style}
                    </p>
                    <p>
                      <strong>Fabric:</strong> {order.design.fabric}
                    </p>

                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setIsModalOpen(true);
                      }}
                      className="w-full border border-gray-300 text-gray-700 rounded-md px-4 py-2 hover:bg-gray-50 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-7xl h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-4 border-b flex justify-between items-center shrink-0">
              <div>
                <h2 className="text-xl font-bold">
                  Order #{selectedOrder._id.slice(-6)}
                </h2>
                <span
                  className={`mt-2 inline-block px-2 py-1 rounded-full text-xs text-white ${getStatusBadgeColor(
                    selectedOrder.status
                  )}`}
                >
                  {selectedOrder.status}
                </span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Content - Using Grid for Better Organization */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
                {/* Left Column: Order Summary and Customer Notes */}
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-md font-semibold text-blue-800 mb-2">
                      Order Summary
                    </h3>
                    <p className="text-blue-600 text-sm">
                      Created:{" "}
                      {new Date(selectedOrder.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {selectedOrder.notes && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-md font-semibold mb-2">
                        Customer Notes
                      </h3>
                      <p className="text-sm text-gray-600 whitespace-pre-wrap">
                        {selectedOrder.notes}
                      </p>
                    </div>
                  )}
                </div>

                {/* Middle Column: Measurements and Design Details */}
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-md font-semibold mb-3">Measurements</h3>
                    <div className="space-y-2">
                      {Object.entries(selectedOrder.measurements).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex justify-between text-sm border-b border-gray-200 pb-1"
                          >
                            <span className="capitalize text-gray-600">
                              {key.replace(/_/g, " ")}
                            </span>
                            <span className="font-medium">{value} inches</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-md font-semibold mb-3">
                      Design Details
                    </h3>
                    <div className="space-y-2">
                      {Object.entries(selectedOrder.design).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex justify-between text-sm border-b border-gray-200 pb-1"
                          >
                            <span className="capitalize text-gray-600">
                              {key.replace(/_/g, " ")}
                            </span>
                            <span className="font-medium">{value}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column: Reference Images */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-md font-semibold mb-3">
                    Reference Images
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedOrder.referenceImages.map((image, index) => (
                      <div
                        key={index}
                        className="aspect-square rounded-lg overflow-hidden bg-gray-100"
                      >
                        <img
                          src={image}
                          alt={`Reference ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t bg-gray-50 shrink-0">
              {selectedOrder.status === "pending" && (
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    placeholder="Enter price (INR)"
                    className="flex-1 p-2 border rounded-lg"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <button
                    className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-800"
                    onClick={() => handleAcceptOrder(selectedOrder._id, price)}
                  >
                    Bid Order
                  </button>
                </div>
              )}

              {selectedOrder.status === "in_progress" && (
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Update progress (%)"
                    className="flex-1 p-2 border rounded-lg"
                    value={progress}
                    onChange={(e) => setProgress(e.target.value)}
                  />
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    onClick={() =>
                      handleUpdateProgress(selectedOrder._id, progress)
                    }
                  >
                    Update Progress
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewOrders;
