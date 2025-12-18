import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:3000"; // backend base URL
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [food_list, setFoodList] = useState([]);

  // Add item to cart
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        url + "/api/cart/add-to-cart",
        { itemId },
        { headers: { token } }
      );
    }
  };

  // Remove one quantity from cart
  const removeFromCart = async (itemId) => {
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
    if (token) {
      await axios.post(
        url + "/api/cart/remove-from-cart",
        { itemId },
        { headers: { token } }
      );
    }
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

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        url + "/api/cart/get",
        {},
        { headers: { token } }
      );
      setCartItems(response.data.cartData);
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  //for if we reload page every time not logout
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

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
