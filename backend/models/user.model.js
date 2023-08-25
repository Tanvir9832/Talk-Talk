const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true , "Please enter your name"],
    },
    email : {
        type : String,
        required : [true , "Please enter your email"],
        unique : true
    },
    password : {
        type : String,
        min : 6,
        select : false,
        required : [true , "Please enter your password"],
    },
    image : {
        type : String,
        default : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    }
 
},{
    timestamps : true,
});


userSchema.pre('save',async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
    }
    next();
})

userSchema.methods.isPasswordMatch = async function(password){
    return await bcrypt.compare(password , this.password);
}

userSchema.methods.generateToken =async function(){
    const token = await jwt.sign({id : this._id},process.env.SECRET,{
        expiresIn : "90d"
    });
    return token;
}


const User = mongoose.model("User",userSchema);
module.exports = {
    User
}