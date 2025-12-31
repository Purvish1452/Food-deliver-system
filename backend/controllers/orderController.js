import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Place Order
const placeorder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;

    if (!items || items.length === 0) {
      return res.json({ success: false, message: "No items in order" });
    }

    // Save order
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      payment: false,      // default false
      status: "Food Processing",
    });
    await newOrder.save();

    // Clear cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // Stripe line items
    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    // Delivery charges
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: { name: "Delivery Charges" },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Order Error:", error);
    res.json({ success: false, message: "Order failed" });
  }
};

// Verify Payment
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body; // must match frontend keys

  try {
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (success === "true") {
      order.payment = true;                // mark paid
      order.status = "Payment Completed";  // optional
      await order.save();
      return res.json({ success: true, message: "Paid" });
    } else {
      return res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.error("Verify Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

//user order for frontend

const userOrders=async(req,res) =>{
   try {
        const orders =await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders})
   } catch (error) {

      console.log(error);
      res.json({success:false,message:"Error"});
    
   }
}

export { placeorder, verifyOrder ,userOrders};
