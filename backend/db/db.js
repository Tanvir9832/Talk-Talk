const mongoose = require("mongoose");


exports.db =async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("database connected");
    } catch (error) {
        console.log("databse connection failed ",error);
    }

}