import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessageController = async (req,res) => {
  try {
    const {message} = req.body;
    const receiverId = req.params.userId;
    const senderId = req.user._id;

    let newMessage = new Message({
      senderId,
      receiverId,
      message
    })
    newMessage.save();

    let conversation = await Conversation.findOne({
      participants: { $all: [receiverId, senderId] },
    });

    if(!conversation){
      await Conversation.create({
        participants: [senderId,receiverId],
        message: newMessage
      });
    }
    if(conversation){
      conversation.message.push(newMessage._id);
      conversation.save();
    }
    res.status(201).json({newMessage});
    console.log("the message is : ",message , "the receiverId is : ", receiverId ,"the senderId is : ",senderId);
  } catch(error){
    console.log("Error :", error.message);
    res.status(500).json({error: "Invalid"})
  }
}

export const getMessageController = async (req,res) => {
  try{
    const receiverId = req.params.id;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId,receiverId]},
    }).populate("message");

    if(!conversation){
      res.status(201).json([]);
    }
    const messages = conversation.message
    res.status(200).json(messages);
    console.log("The conversation is : " , conversation);
    console.log("The sender id is : ", senderId, "The receiver id is : ",  receiverId);
  } catch(error){
    console.log("the error is :" , error.message);
    res.status(500).json({ error : "Internal server error"});
  }
}
