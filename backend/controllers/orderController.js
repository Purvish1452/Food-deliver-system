import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeorder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
    const { items, amount, address } = req.body;
    const userId = req.userId; // ✅ from auth middleware

    if (!items || items.length === 0) {
      return res.json({ success: false, message: "No items in order" });
    }

    // ✅ Save order
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
    });
    await newOrder.save();

    // ✅ Clear cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // ✅ Stripe line items
    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // ✅ correct
      },
      quantity: item.quantity,
    }));

    // ✅ Delivery charges
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
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
    console.log("Order Error:", error);
    res.json({ success: false, message: "Order failed" });
  }
};

export { placeorder };
