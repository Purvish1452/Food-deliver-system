import User from "../models/userModel.js";

// Add item
export const addToCart = async (req, res) => {
  const { itemId } = req.body;
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    if (!user.cartData) user.cartData = {};
    user.cartData.set(itemId, (user.cartData.get(itemId) || 0) + 1);
    await user.save();
    res.json({ success: true, cartData: Object.fromEntries(user.cartData) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Remove one
export const removeFromCart = async (req, res) => {
  const { itemId } = req.body;
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    const qty = user.cartData.get(itemId) || 0;
    if (qty > 1) user.cartData.set(itemId, qty - 1);
    else user.cartData.delete(itemId);
    await user.save();
    res.json({ success: true, cartData: Object.fromEntries(user.cartData) });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete completely
export const deleteFromCart = async (req, res) => {
  const { itemId } = req.body;
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    user.cartData.delete(itemId);
    await user.save();
    res.json({ success: true, cartData: Object.fromEntries(user.cartData) });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get cart
export const getCart = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    res.json({ success: true, cartData: Object.fromEntries(user.cartData || {}) });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
