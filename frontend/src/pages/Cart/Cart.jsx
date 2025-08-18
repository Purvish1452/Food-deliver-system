import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./Cart.css";

const Cart = () => {
  const { cardItems, food_list, removeFromCard, getTotalCartAmount } =
    useContext(StoreContext);

  // Check if cart is empty
  const hasItems = Object.values(cardItems).some((quantity) => quantity > 0);

  const handleRemoveItem = (itemId) => {
    removeFromCard(itemId);
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Item</p>
          <p>Name</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        {!hasItems ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
          </div>
        ) : (
          food_list.map((item) => {
            if (cardItems[item._id] > 0) {
              return (
                <div key={item._id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p>{cardItems[item._id]}</p>
                  <p>₹{item.price * cardItems[item._id]}</p>
                  <p
                    className="cart-remove-icon"
                    onClick={() => handleRemoveItem(item._id)}
                  >
                    ❌
                  </p>
                </div>
              );
            } else {
              return null;
            }
          })
        )}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{2}</p>
            </div>
            <div className="cart-total-details">
              <p>Total</p>
              <p>{getTotalCartAmount() + 2}</p>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have Promo code,Enter it here </p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
