import express from "express";
import { sendMessageController,getMessageController } from "../controllers/message.controller.js";
import checkLogin from "../middleware/checkLogin.js";
const router = express.Router();

router.post('/send/:userId', checkLogin ,sendMessageController)

router.get('/:id', checkLogin, getMessageController)

export default router;