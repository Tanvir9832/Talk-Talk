const express = require("express");
const cors = require("cors");
const cloudinary = require("cloudinary");



//!export files
const { router } = require("./routers/UserRouter/user.Route");
const {messageRouter} = require("./routers/messageRouter/message.Route")
const data = require("./db/dummydata");
const auth = require("../backend/middleware/auth");
const { notFound, errorHandler } = require("./middleware/errorHandlingMiddleware");
const { chatRoute } = require("./routers/chatRouter/chat.Route");


const app = express();
require("dotenv").config();

//!use third party middleware
app.use(express.json({limit : "50mb"}));
app.use(express.urlencoded({extended : false}));
app.use(cors());


//!use router
app.use('/api/user',router);
app.use('/api/message',messageRouter);
app.use('/api/chat',chatRoute);


//!cloudinary connection
cloudinary.config({
  cloud_name : process.env.CLOUD_NAME,
  api_key : process.env.API_KEY,
  api_secret : process.env.API_SECRET
})

app.get("/", (req, res) => {
  res.status(200).json({
    message: "HELLO",
  });
});

app.get("/chat",auth.auth,(req,res)=>{
    res.status(200).json({
        data
    })
})

// app.use("*",(req,res,next)=>{
// res.status(404).json({
//   message : "route not found"
// })
// })

// app.use((err,req,res,next)=>{
//   res.status(500).json({
//     message : err.message
//   })
  
// })
//!user errorhandling middleware
app.use(notFound);
app.use(errorHandler);
module.exports = {
  app
};
