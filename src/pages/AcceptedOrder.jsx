import React, { useState, useEffect } from "react";
import "./AcceptedOrders.css";

const AcceptedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAcceptedOrders = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/designer/accepted-orders`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch accepted orders");
      }

      const data = await response.json();
      setOrders(Array.isArray(data) ? data : data.orders || []);
    } catch (error) {
      console.error("Error fetching accepted orders:", error);
      setError("Failed to load accepted orders: " + error.message);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAcceptedOrders();
  }, []);

  const handleUpdateStatus = async (orderId, status) => {
    try {
      setError("");
      setSuccess("");

      if (!status) {
        setError("Please select a status");
        return;
      }

      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/designer/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
          credentials: "include",
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.message || "Failed to update order status"
        );
      }

      setSuccess("Order status updated successfully!");
      fetchAcceptedOrders();
      setSelectedOrder(null);
      setIsModalOpen(false);
      setNewStatus("");
    } catch (error) {
      console.error("Error updating order status:", error);
      setError("Failed to update status: " + error.message);
    }
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      accepted: "status-badge-accepted",
      in_progress: "status-badge-in-progress",
      completed: "status-badge-completed",
      shipped: "status-badge-shipped",
      delivered: "status-badge-delivered",
      cancelled: "status-badge-cancelled",
    };
    return colors[status] || "status-badge-default";
  };

  const renderStatusOptions = () => {
    const statusFlow = {
      accepted: ["in_progress"],
      in_progress: ["completed"],
      completed: ["shipped"],
      shipped: ["delivered"],
    };

    const currentStatus = selectedOrder ? selectedOrder.status : "";
    const availableStatuses = statusFlow[currentStatus] || [];

    return (
      <select
        value={newStatus}
        onChange={(e) => setNewStatus(e.target.value)}
        className="status-select"
      >
        <option value="">Select new status</option>
        {availableStatuses.map((status) => (
          <option key={status} value={status}>
            {status.replace(/_/g, " ").toUpperCase()}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div className="accepted-orders-container">
      {error && (
        <div className="error-alert">
          <div className="alert-content">
            <div className="alert-icon">
              <svg
                className="error-icon"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="alert-message">
              <p>{error}</p>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="success-alert">
          <div className="alert-content">
            <div className="alert-icon">
              <svg
                className="success-icon"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="alert-message">
              <p>{success}</p>
            </div>
          </div>
        </div>
      )}

      <div className="orders-card">
        <div className="orders-header">
          <div>
            <h2>My Accepted Orders</h2>
            <p>View and manage all your accepted orders</p>
          </div>
          <button onClick={fetchAcceptedOrders} className="refresh-button">
            <svg
              className="refresh-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="orders-grid-container">
            <div className="orders-grid">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <div key={index} className="skeleton-card">
                  <div className="skeleton-header">
                    <div className="skeleton-title skeleton-loader"></div>
                    <div className="skeleton-badge skeleton-loader"></div>
                  </div>
                  <div className="skeleton-body">
                    <div className="skeleton-row">
                      <div className="skeleton-label skeleton-loader"></div>
                      <div className="skeleton-value skeleton-loader"></div>
                    </div>
                    <div className="skeleton-row">
                      <div className="skeleton-label skeleton-loader"></div>
                      <div className="skeleton-value skeleton-loader"></div>
                    </div>
                    <div className="skeleton-row">
                      <div className="skeleton-label skeleton-loader"></div>
                      <div className="skeleton-value skeleton-loader"></div>
                    </div>
                    <div className="skeleton-button skeleton-loader"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : orders.length === 0 ? (
          <div className="empty-state">
            <svg
              className="empty-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3>No accepted orders</h3>
            <p>You don't have any accepted orders yet.</p>
          </div>
        ) : (
          <div className="orders-grid-container">
            <div className="orders-grid">
              {orders.map((order) => (
                <div key={order._id} className="order-card">
                  <div className="order-card-header">
                    <h3>Order #{order._id.slice(-6).toUpperCase()}</h3>
                    <span
                      className={`status-badge ${getStatusBadgeColor(
                        order.status
                      )}`}
                    >
                      {order.status.replace(/_/g, " ").toUpperCase()}
                    </span>
                  </div>
                  <div className="order-card-body">
                    <div className="order-details">
                      <div className="order-detail-row">
                        <p>Style:</p>
                        <p>{order.design.style}</p>
                      </div>
                      <div className="order-detail-row">
                        <p>Price:</p>
                        <p className="order-price">₹{order.price.toFixed(2)}</p>
                      </div>
                      <div className="order-detail-row">
                        <p>Accepted on:</p>
                        <p>
                          {new Date(
                            order.acceptedAt || order.updatedAt
                          ).toLocaleDateString()}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setIsModalOpen(true);
                          setNewStatus("");
                        }}
                        className="view-order-button"
                      >
                        View & Update Order
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="modal-overlay">
          <div className="modal-container">
            {/* Modal Header */}
            <div className="modal-header">
              <div>
                <h2>Order #{selectedOrder._id.slice(-6).toUpperCase()}</h2>
                <div className="order-tags">
                  <span
                    className={`status-badge ${getStatusBadgeColor(
                      selectedOrder.status
                    )}`}
                  >
                    {selectedOrder.status.replace(/_/g, " ").toUpperCase()}
                  </span>
                  <span className="order-price-tag">
                    ₹{selectedOrder.price.toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="modal-close-button"
              >
                <svg
                  className="close-icon"
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

            {/* Modal Content */}
            <div className="modal-content">
              <div className="modal-grid">
                {/* Left Column: Order Summary and Customer Notes */}
                <div className="modal-column">
                  <div className="info-card">
                    <h3>Order Summary</h3>
                    <div className="info-content">
                      <div className="info-row">
                        <span>Created:</span>
                        <span>
                          {new Date(
                            selectedOrder.createdAt
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="info-row">
                        <span>Accepted:</span>
                        <span>
                          {new Date(
                            selectedOrder.acceptedAt || selectedOrder.updatedAt
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="info-row-total">
                        <span>Total Price:</span>
                        <span className="total-price">
                          ₹{selectedOrder.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {selectedOrder.notes && (
                    <div className="info-card">
                      <h3>Customer Notes</h3>
                      <p className="customer-notes">{selectedOrder.notes}</p>
                    </div>
                  )}

                  <div className="info-card">
                    <h3>Order Timeline</h3>
                    <div className="timeline">
                      <div className="timeline-item">
                        <div className="timeline-marker accepted"></div>
                        <p className="timeline-title">Order Created</p>
                        <p className="timeline-date">
                          {new Date(selectedOrder.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="timeline-item">
                        <div className="timeline-marker accepted"></div>
                        <p className="timeline-title">Order Accepted</p>
                        <p className="timeline-date">
                          {new Date(
                            selectedOrder.acceptedAt || selectedOrder.updatedAt
                          ).toLocaleString()}
                        </p>
                      </div>
                      {selectedOrder.status === "in_progress" && (
                        <div className="timeline-item">
                          <div className="timeline-marker in-progress"></div>
                          <p className="timeline-title">In Progress</p>
                          <p className="timeline-date">
                            Progress: {selectedOrder.progress || 0}%
                          </p>
                        </div>
                      )}
                      {selectedOrder.status === "completed" && (
                        <div className="timeline-item">
                          <div className="timeline-marker completed"></div>
                          <p className="timeline-title">Completed</p>
                          <p className="timeline-date">
                            {new Date(
                              selectedOrder.completedAt ||
                                selectedOrder.updatedAt
                            ).toLocaleString()}
                          </p>
                        </div>
                      )}
                      {selectedOrder.status === "shipped" && (
                        <div className="timeline-item">
                          <div className="timeline-marker shipped"></div>
                          <p className="timeline-title">Shipped</p>
                          <p className="timeline-date">
                            {new Date(
                              selectedOrder.shippedAt || selectedOrder.updatedAt
                            ).toLocaleString()}
                          </p>
                        </div>
                      )}
                      {selectedOrder.status === "delivered" && (
                        <div className="timeline-item">
                          <div className="timeline-marker delivered"></div>
                          <p className="timeline-title">Delivered</p>
                          <p className="timeline-date">
                            {new Date(
                              selectedOrder.deliveredAt ||
                                selectedOrder.updatedAt
                            ).toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Middle Column: Measurements and Design Details */}
                <div className="modal-column">
                  <div className="info-card">
                    <h3>Measurements</h3>
                    <div className="measurements-grid">
                      {Object.entries(selectedOrder.measurements || {}).map(
                        ([key, value]) => (
                          <div key={key} className="measurement-item">
                            <p className="measurement-label">
                              {key.replace(/_/g, " ")}
                            </p>
                            <p className="measurement-value">
                              {value} <span>inches</span>
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="info-card">
                    <h3>Design Details</h3>
                    <div className="design-details">
                      {Object.entries(selectedOrder.design || {}).map(
                        ([key, value]) => (
                          <div key={key} className="design-detail-row">
                            <span className="design-detail-label">
                              {key.replace(/_/g, " ")}
                            </span>
                            <span className="design-detail-value">{value}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column: Reference Images */}
                <div className="modal-column">
                  <div className="info-card images-card">
                    <h3>Reference Images</h3>
                    <div className="images-grid">
                      {(selectedOrder.referenceImages || []).map(
                        (image, index) => (
                          <div key={index} className="image-container">
                            <img
                              src={image}
                              alt={`Reference ${index + 1}`}
                              className="reference-image"
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            {selectedOrder.status !== "delivered" && (
              <div className="modal-footer">
                <div className="status-update-container">
                  <div className="status-select-container">
                    {renderStatusOptions()}
                  </div>
                  <button
                    className={`update-status-button ${
                      newStatus ? "active" : "disabled"
                    }`}
                    onClick={() =>
                      handleUpdateStatus(selectedOrder._id, newStatus)
                    }
                    disabled={!newStatus}
                  >
                    Update Status
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AcceptedOrders;
