import React, { useContext } from "react";
import "./Placeorder.css";
import { StoreContext } from "../../context/StoreContext";
import { useState } from "react";
const Placeorder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);
  const [data, setdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    zipcode: "",
    city: "",
    street: "",
    state: "",
    country: "",
  });

  const onchangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setdata((data) => ({ ...data, [name]: value }));
  };

  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input
            name="firstname"
            onChange={onchangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First Name"
          />
          <input
            name="lastname"
            onChange={onchangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
          />
        </div>

        <input
          name="email"
          onChange={onchangeHandler}
          value={data.email}
          type="text"
          placeholder="Email address"
        />
        <input
          name="street"
          onChange={onchangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />

        <div className="multi-fields">
          <input
            name="city"
            onChange={onchangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            name="state"
            onChange={onchangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>

        <div className="multi-fields">
          <input
            name="zipcode"
            onChange={onchangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip code"
          />
          <input
            name="country"
            onChange={onchangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>

        <input type="text" placeholder="Phone" />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <div className="cart-total-details">
              <p>Total</p>
              <p>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </p>
            </div>
          </div>
          <button>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;
