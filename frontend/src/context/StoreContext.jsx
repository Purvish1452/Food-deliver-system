import React, { createContext, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:3000"; // backend base URL
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Add item to cart
  const addToCart = (itemId) => {
    const id = String(itemId); // ensure string keys
    setCartItems((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  // Remove one quantity from cart
  const removeFromCart = (itemId) => {
    const id = String(itemId);
    setCartItems((prev) => {
      if (!prev[id]) return prev;
      const updated = { ...prev };
      if (updated[id] > 1) {
        updated[id] -= 1;
      } else {
        delete updated[id];
      }
      return updated;
    });
  };

  // Delete item completely
  const deleteFromCart = (itemId) => {
    const id = String(itemId);
    setCartItems((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  // Calculate total amount
  const getTotalCartAmount = () => {
    let total = 0;
    for (const id in cartItems) {
      if (cartItems[id] > 0) {
        const itemInfo = food_list.find((p) => String(p._id) === id);
        if (itemInfo) {
          total += itemInfo.price * cartItems[id];
        }
      }
    }
    return total;
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    deleteFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
