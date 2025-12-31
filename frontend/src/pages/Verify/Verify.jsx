import React, { useContext, useEffect } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success"); // "true" or "false"
  const orderId = searchParams.get("orderId");

  const { url, token } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    if (!token) {
      alert("You must login first");
      navigate("/");
      return;
    }

    try {
      const response = await axios.post(
        `${url}/api/order/verify`,
        { orderId, success },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ required
          },
        }
      );

      if (response.data.success) {
        navigate("/myorders"); // payment successful
      } else {
        alert("Payment failed or canceled");
        navigate("/");
      }
    } catch (error) {
      console.error("Verify error:", error.response?.data || error.message);
      alert("Server error during verification");
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
      <p>Verifying your payment...</p>
    </div>
  );
};

export default Verify;
