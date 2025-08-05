import React, { useState } from "react";
import Navbar from "./components/navbar/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Placeorder from "./pages/Placeorder/Placeorder";
import Home from "./pages/home/home";
import Cart from "./pages/Cart/Cart";
import Footer from "./components/Footer/Footer";
import Loginpopup from "./components/Loginpopup/Loginpopup";
const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin ? <Loginpopup setShowLogin={setShowLogin} /> : <></>};
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/card" element={<Cart />} />
          <Route path="/order" element={<Placeorder />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
