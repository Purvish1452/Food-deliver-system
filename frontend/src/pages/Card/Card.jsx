import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./Card.css";

const Card = () => {
  const { cardItems, food_list, removeFromCard } = useContext(StoreContext);

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Item</p>
          <p>Name</p>
          <p>Price</p>
        </div>

        {food_list.map((item) => {
          if (cardItems[item.id] > 0) {
            return (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>₹{item.price}</p>
                <p>Qty: {cardItems[item.id]}</p>
                <button onClick={() => removeFromCard(item.id)}>Remove</button>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default Card;
