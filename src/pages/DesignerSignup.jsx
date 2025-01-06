import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DesignerSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    try {
      const response = await axios.post(`${backendUrl}/api/designer/register`, {
        name,
        email,
        password,
      });

      if (response.data.success) {
        toast.success("Signup successful");
        localStorage.setItem("designerToken", response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r bg-gradient-to-br from-gray-300 to-pink-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Designer Signup
          </h1>
          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a
                href="/designer/login"
                className="text-purple-600 hover:underline"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
      />
    </div>
  );
};

export default DesignerSignup;
