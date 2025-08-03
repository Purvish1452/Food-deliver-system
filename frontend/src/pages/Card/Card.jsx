import React from "react";
import "./Card.css";
import { food_list } from "../../assets/assets";
const Card = () => {
  const { cartItems, food_list, removeFromCart } = useContext(StoreContext);
  return (
  <div className="cart">
    <div className="cart-items">
      <div className="cart-items-title">
           <p>Item</p>
           <p>Title</p>
           <p>Price</p>
           <p>Quantity</p>
           <p>Total</p>
           <p>Remove</p>
      </div>
      <br/>
      <hr/>
      
    </div>


  </div>
  )
};

export default Card;
