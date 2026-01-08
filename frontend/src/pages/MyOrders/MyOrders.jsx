import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's orders from backend
  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userorders`,
        {},
        {
          headers: {
            token: token,
          },
        }
      );

      console.log("API RESPONSE:", response.data);
      setData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching orders:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>

      <div className="container">
        {loading ? (
          <p>Loading orders...</p>
        ) : data.length === 0 ? (
          <p className="no-orders">You have no orders yet</p>
        ) : (
          data.map((order) => (
            <div key={order._id} className="my-orders-order">
              <img src={assets.parcel_icon} alt="order" />

              <div className="order-details">
                <p className="order-items">
                  {order.items?.map((item, i) => (
                    <span key={i}>
                      {item.name} x {item.quantity}
                      {i < order.items.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>

                <p className="order-amount">₹{order.amount}</p>
                <p className="order-count">Items: {order.items.length}</p>
                <p className="order-status">
                  <span
                    className="status-dot"
                    style={{
                      color:
                        order.status.toLowerCase() === "delivered"
                          ? "green"
                          : "orange",
                    }}
                  >
                    &#x25cf;
                  </span>
                  {order.status}
                </p>
              </div>

              <button className="track-btn">Track Order</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
