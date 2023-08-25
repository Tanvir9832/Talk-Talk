const { Chat } = require("../../models/chat.model");
const { Message } = require("../../models/message.model");

const sendMessage = async(req,res)=>{
    try {
        const {message , chatId} = req.body;
        if(!message || !chatId)return res.status(400).json({message : "No message found"});

        const chat = await Chat.findById(chatId);
        const newMessage={
            sender : req.user._id,
            message : message,
            reader : chat.users[0].toString() === req.user._id.toString() ? chat.users[1] : chat.users[0],
            chat : chatId
        }
        const newMessageCreated = await Message.create(newMessage);
        const findNewMessage =  await Message.findById(newMessageCreated).populate("sender reader chat");

        chat.latestMessage = findNewMessage._id;
        await chat.save();

        return res.status(200).json({
           data : findNewMessage
        })
    } catch (error) {
        return res.status(500).json({
            message : "Message send failed"
         })
    }
}

const allMessage =async(req,res)=>{
    try {
        const chatId = req.params.chatId;

        if(!chatId)return res.status(400).json({messgae : "Chat id not found"});

        const chat = await Chat.findById(chatId);
        if(!chat)return res.status(400).json({message : "Chat not found"});

        const allMessage = await Message.find({chat : chatId}).populate("sender reader chat").sort({createdAt : -1 , updatedAt : -1 });

        return res.status(200).json({
            allMessage
        })

    } catch (error) {
        return res.status(500).json({
            message : "All Message not failed"
        })
    }
}

module.exports ={
    sendMessage,
    allMessage
}