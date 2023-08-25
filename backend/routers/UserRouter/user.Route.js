const express = require("express");
const { login, register ,searchUser } = require("../../controllers/userController/User");
const { auth } = require("../../middleware/auth");

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/search",auth,searchUser);

module.exports={
    router
}