import React, { useContext, useState, useEffect } from "react";
import "./Placeorder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const Placeorder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  // Form state
  const [data, setData] = useState({
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

  // Orders state
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle input change
  const onchangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Fetch orders
  const fetchOrders = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await axios.get(`${url}/api/order/get`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data.orders);
      console.log("Orders fetched:", res.data.orders);
    } catch (error) {
      console.error(
        "Error fetching orders:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  // Place order
  const placeOrder = async (event) => {
    event.preventDefault();

    if (!token) {
      alert("Please login first");
      return;
    }

    // Prepare items from cart
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({
          ...item,
          quantity: cartItems[item._id],
        });
      }
    });

    if (orderItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const OrderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, OrderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        alert("Order placed successfully!");
        // Refresh orders immediately
        fetchOrders();
      } else {
        alert(response.data.message || "Order failed");
      }
    } catch (error) {
      console.error(
        "Place order error:",
        error.response?.data || error.message
      );
      alert("Unauthorized or server error");
    }
  };

  return (
    <div className="place-order-container">
      <form onSubmit={placeOrder} className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>

          <div className="multi-fields">
            <input
              name="firstName"
              required
              value={data.firstName}
              onChange={onchangeHandler}
              placeholder="First Name"
            />
            <input
              name="lastName"
              required
              value={data.lastName}
              onChange={onchangeHandler}
              placeholder="Last Name"
            />
          </div>

          <input
            name="email"
            required
            value={data.email}
            onChange={onchangeHandler}
            placeholder="Email"
          />
          <input
            name="street"
            required
            value={data.street}
            onChange={onchangeHandler}
            placeholder="Street"
          />

          <div className="multi-fields">
            <input
              name="city"
              required
              value={data.city}
              onChange={onchangeHandler}
              placeholder="City"
            />
            <input
              name="state"
              required
              value={data.state}
              onChange={onchangeHandler}
              placeholder="State"
            />
          </div>

          <div className="multi-fields">
            <input
              name="zipcode"
              required
              value={data.zipcode}
              onChange={onchangeHandler}
              placeholder="Zip code"
            />
            <input
              name="country"
              required
              value={data.country}
              onChange={onchangeHandler}
              placeholder="Country"
            />
          </div>

          <input
            name="phone"
            required
            value={data.phone}
            onChange={onchangeHandler}
            placeholder="Phone"
          />
        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <p>Total: ₹{getTotalCartAmount() + 2}</p>
            <button type="submit">PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>

      <div className="orders-section">
        <h2>Your Orders</h2>
        {loading && <p>Loading orders...</p>}
        {!loading && orders.length === 0 && <p>No orders found.</p>}
        {!loading &&
          orders.map((order) => (
            <div
              key={order._id}
              className="order-card"
              style={{
                border: "1px solid #ccc",
                margin: "10px 0",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <p>
                <b>Order ID:</b> {order._id}
              </p>
              <p>
                <b>Amount:</b> ₹{order.amount}
              </p>
              <p>
                <b>Date:</b> {new Date(order.createdAt).toLocaleString()}
              </p>
              <p>
                <b>Items:</b>
              </p>
              <ul>
                {order.items.map((item) => (
                  <li key={item._id}>
                    {item.name} x {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Placeorder;
