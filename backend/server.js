import express from "express";
import dotenv from "dotenv";
import authRoutes from "../backend/routes/auth.routes.js";
import messageRoutes from "../backend/routes/message.routes.js";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cookieParser());
app.get('/',(req,res)=> {
  res.send("TESTSSSSSSSs");
})

app.get('/test',(req,res) => {
  res.send("<h1>This is the test rout page</h1>");
})
app.use('/auth', authRoutes);  
app.use('/message', messageRoutes)

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port http://localhost:${PORT}`);
})