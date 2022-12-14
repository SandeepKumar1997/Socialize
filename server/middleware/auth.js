import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyUser = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoding = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoding.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized to continue" });
    }
  }

  if (!token) {
    res.status(400).json({ message: "Access Denied" });
  }
};
