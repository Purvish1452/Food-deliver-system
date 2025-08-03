import React, { useContext, useState } from "react";
import "./Fooditem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext"; // ✅ Import context

const Fooditem = ({ id, name, price, description, image }) => {
  const [itemCount, setItemCount] = useState(0);
  const { addtocard, removeFromCard } = useContext(StoreContext); // ✅ Use correct names

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={image} alt={name} />

        {!itemCount ? (
          <img
            className="add"
            onClick={() => {
              setItemCount(1);
              addtocard(id); // ✅ Correct usage
            }}
            src={assets.add_icon_white}
            alt="Add"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => {
                setItemCount((prev) => Math.max(prev - 1, 0));
                removeFromCard(id); // ✅ Correct usage
              }}
              src={assets.remove_icon_red}
              alt="Remove"
            />
            <p>{itemCount}</p>
            <img
              onClick={() => {
                setItemCount((prev) => prev + 1);
                addtocard(id); // ✅ Correct usage
              }}
              src={assets.add_icon_green}
              alt="Add"
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">₹{price}</p>
      </div>
    </div>
  );
};

export default Fooditem;
