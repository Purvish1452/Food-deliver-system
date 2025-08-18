import React, { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

// Create context
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cardItems, setCardItems] = useState({});

  // Add one item to cart
  const addtocard = (itemId) => {
    setCardItems((prev) => {
      if (!prev[itemId]) {
        return { ...prev, [itemId]: 1 };
      } else {
        return { ...prev, [itemId]: prev[itemId] + 1 };
      }
    });
  };

  // Remove one item from cart
  const removeFromCard = (itemId) => {
    setCardItems((prevItems) => {
      const updatedItems = { ...prevItems };

      if (!updatedItems[itemId]) return prevItems; // Item not in card, nothing to remove

      if (updatedItems[itemId] > 1) {
        updatedItems[itemId] -= 1; // Decrease quantity by 1
      } else {
        delete updatedItems[itemId]; // Remove item if quantity is 1 or less
      }

      return updatedItems;
    });
  };

  // ❌ Remove all quantities of item from cart
  const deleteFromCart = (itemId) => {
    setCardItems((prevItems) => {
      const updatedCart = { ...prevItems };
      delete updatedCart[itemId];
      return updatedCart;
    });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cardItems) {
      if (cardItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id == item);
        totalAmount += itemInfo.price * cardItems[item];
      }
    }
    return totalAmount;
  };

  const contextValue = {
    food_list,
    cardItems,
    setCardItems,
    addtocard,
    removeFromCard,
    deleteFromCart,
    getTotalCartAmount,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
