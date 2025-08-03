import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./Card.css";

const Card = () => {
  const { cardItems, food_list, removeFromCard } = useContext(StoreContext);

  return (
    <div className="card">
      <div className="card-items">
        <div className="card-items-title">
          <p>Item</p>
          <p>Name</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        {food_list.map((item) => {
          if (cardItems[item.id] > 0) {
            return (
              <div key={item.id} className="card-item">
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
