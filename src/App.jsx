import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DesignerDashboard from "./pages/DesignerDashboard";
import NewOrders from "./pages/NewOrders";
import UploadDesign from "./pages/UploadDesign";
import AcceptedOrders from "./pages/AcceptedOrder";

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/designer-dashboard" element={<DesignerDashboard />} />
          <Route path="/" element={<DesignerDashboard />} />
          <Route path="/get-new-order" element={<NewOrders />} />
          <Route path="/my-orders" element={<AcceptedOrders />} />
          <Route path="/upload-new-design" element={<UploadDesign />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
