import User from "../models/users.model.js";
import bcrypt from "bcryptjs";
import generateTokenWithCookie from "../utils/generateToken.js";

export const signUp = async (req,res) => {
  try {
    const {firstName,lastName,userName,gender,password,confirmPassword} = await req.body; 

      if(password !== confirmPassword){
        console.log("Password dont match");
        return res.status(400).json({ error: "Password dont match"});
      }
      const user = await User.findOne({userName});
      if(user) {
        console.log("Username exist");
        return res.status(400).json({error: "Username exist"});
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password,salt);
      const maleProfImg = "https://avatar.iran.liara.run/public/boy";
      const femaleProfImg = "https://avatar.iran.liara.run/public/girl"
      const newUser = new User({
        firstName,
        lastName,
        userName,
        gender,
        profImg: gender == "male" ? maleProfImg : femaleProfImg,
        password: hashedPass,
      })
      await newUser.save();
      if(newUser){
        generateTokenWithCookie(newUser._id,res);
        res.status(201).json({
          _id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          userName: newUser.userName,
          gender: newUser.gender,
          password: newUser.password
        })
      }
      console.log("data stored successfully");
  }
  catch(e) {
    console.log("Error : " , e.message);
  }
}

export const logIn = async (req,res) => {
  try {
    const { userName,password } = req.body;
    const user = await User.findOne({userName});
    const correctPass = await bcrypt.compare(password, user?.password || "");
    if(!user || !correctPass){
      return res.status(404).json({error :"Invalid username or pass"});
    }
    else {
      res.status(201).json({
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName
      })
    }
  }
  catch(e) {
    res.status(500).json({ error: "Internal server error" });
    console.log("Error : " , e.message);
  }
}

export const logOut = async (req,res) => {
  try{
    res.cookie("jwt","",{ maxAge: 0});
    res.status(200).json({ message: "Logged out successfully"})
  }
  catch(e) {
    res.status(500).json({ error: "Internal server error" });
    console.log("Error : " , e.message);
  }
}