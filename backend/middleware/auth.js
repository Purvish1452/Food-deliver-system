import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.headers.token; // frontend sends token in headers
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // attach userId to request
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export default authMiddleware;
