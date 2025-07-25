import jwt from "jsonwebtoken";
import User from "../models/User.js"; 
import dotenv from "dotenv";
dotenv.config();


export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.user = await User.findById(decoded.id).select("-password");
      if(!req.user){
        return res.status(401).json({ message: "Authorization failed" });
      }


      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

export const adminOnly= async(req, res, next)=>{
  if (req.user && req.user.isAdmin) {
    return next();
  }
  else{
    return res.status(403).json({ message: "Access denied, admin only" });
  }

};