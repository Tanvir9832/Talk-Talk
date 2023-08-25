const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    message : {
        type : String,
        required : true
    },
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    reader :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    chat : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Chat"
    }
},{
    timestamps : true
})

const Message = mongoose.model("Message",messageSchema);

module.exports ={
    Message
}