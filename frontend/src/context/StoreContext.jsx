import React, { createContext, use, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

// Create context here
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cardItems,setCardItems]=useState({});
  const addtocard =(itemId)=>{
    if(!cardItems[itemId]){
        setCardItems((prev)=>({...prev,[itemId]:1}))
    }else{
        setCardItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
    }
  }
  const removeFormCard=(itemId)=>{
    setCardItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))

  }
  useEffect(()=>{
    console.log(cardItems);
  },[cardItems])
  
  const contextValue = {
    food_list,
    cardItems,
    setCardItems,
    addtocard,
    removeFormCard
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
