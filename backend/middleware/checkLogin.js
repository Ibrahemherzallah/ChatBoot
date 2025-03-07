import {sendMessageController} from "../controllers/message.controller.js"
import User from "../models/users.model.js";
import jwt from 'jsonwebtoken';
const checkLogin = async (req,res,next) => {
  try {
    const token = req.cookies.jwt;
    if(!token){
      return res.status(401).json({error: "Unauthorized - No Token Provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if(!decoded){
      return res.status(401).json({ error: "Unauthorized - Invalid Token"});
    }
    const user = await User.findById(decoded.userId);
    if(!user){
      return res.status(404).json({error : "User not found"});
    }
    req.user = user;
    next();
  }
  catch(error) {
    console.log("Error is accure is : ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}
export default checkLogin;