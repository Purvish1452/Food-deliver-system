import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/sidebar/sidebar";
import { Route, Router, Routes } from "react-router-dom";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import Add from "./pages/Add/Add";
const App = () => {
  return (
    <div>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/List" element={<List />} />
          <Route path="/Orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
