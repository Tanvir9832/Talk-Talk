const { User } = require("../../models/user.model");
const cloudinary = require("cloudinary");

const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, image } = req.body;
    if (!name) return res.status(404).json({ message: "Enter your name" });
    if (!email) return res.status(404).json({ message: "Enter your email" });
    if (!password)
      return res.status(404).json({ message: "Enter your password" });
    if (!confirmPassword)
      return res.status(404).json({ message: "Password does not match" });

    if (password.length < 8)
      return res
        .status(404)
        .json({ message: "Password length must be greater than 8" });

    if (password != confirmPassword)
      return res.status(404).json({ message: "Password does not match" });

    const userExist = await User.find({ email: email });

    let cloud;
    if (image) {
      cloud = cloudinary.v2.uploader.upload(image, {
        folder: "Chat app",
      });
    }

    if (userExist[0]) {
      res.status(404);
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
      image: cloud ? { public_id: cloud.public_id, url: cloud.secure_url } : "",
    });

    res.status(200).json({
      message: "Sing up successful",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Sing up failed",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.find({ email: email }).select("+password");

    if (!user)
      return res.status(200).json({
        message: "User not found",
      });

    const isMatch = await user[0].isPasswordMatch(password);

    if (!isMatch) {
      res.status(404);
      throw new Error("Wrong password");
    }
    const token = await user[0].generateToken();

    res.status(200).json({
      message: "Log in successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Log in failed",
    });
  }
};

const searchUser = async(req, res) => {
  try {
    const query = req.query.search ? {
        $or : [
            {name : {$regex: req.query.search , $options : "i"}},
            {email : {$regex : req.query.search , $options : "i"}}
        ]
    } : {} ;

    const users = await User.find(query).find({_id : {$ne : req.user._id}})
    return res.status(200).json({
      users,
    })
  } catch (error) {}
};

module.exports = {
  login,
  register,
  searchUser
};
