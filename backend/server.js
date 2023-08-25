const { app } = require(".");
const { db } = require("./db/db");



db();

app.listen(process.env.PORT,()=>{
    console.log("Server connected");
})