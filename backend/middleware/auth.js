const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");

const auth = async (req, res, next) => {
  try {
    const authAuthorization = req.headers.authorization;
    if (!authAuthorization)
      return res.status(400).json({
        message: "Log in failed",
      });
    const token = authAuthorization.split(" ")[1];
    const { id } = jwt.verify(token, process.env.SECRET);

    if (!id) {
      console.log("id not found");
      return res.status(400).json({
        message: "Log in failed",
      });
    }
    const user = await User.findById(id);
    if (!user) {
      console.log("user not found");
      return res.status(400).json({
        message: "Log in failed",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Log in failed",
    });
  }
};

module.exports = {
  auth,
};
