import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../../Stitch-N-Style-Frontend/src/components/Header";
import Footer from "../../Stitch-N-Style-Frontend/src/components/Footer";
import DesignerDashboard from "./pages/DesignerDashboard";

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/designer-dashboard" element={<DesignerDashboard />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
