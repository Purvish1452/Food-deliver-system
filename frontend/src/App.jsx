import React from "react";
import Navbar from "./components/navbar/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Placeorder from "./pages/Placeorder/Placeorder";
import Home from "./pages/home/home";
import Card from "./pages/Card/Card";
import Footer from "./components/Footer/Footer";
const App = () => {
  return (
    <>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/card" element={<Card />} />
          <Route path="/order" element={<Placeorder />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
