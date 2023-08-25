const { Chat } = require("../../models/chat.model");
const { User } = require("../../models/user.model");

const accessChat = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: "User not found" });

    //!Finding chat
    let isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    }).populate("users latestMessage");

    //!Populate
    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
    });

    //!isChat check
    if (isChat.length > 0) {
      // return res.status(400).json({ message: "chat not found" });
      return res.status(200).json({ chat: isChat[0] });
    } else {
      const user = await User.findOne({ _id: userId });
      let chatData = {
        chatName: user.name,
        isGroupChat: false,
        users: [req.user._id, userId],
      };

      const chat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: chat._id }).populate("users");
      return res.status(200).json({ chat: FullChat });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "chat not found" });
  }
};

const getChats = async (req, res) => {
  try {
    let user = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users groupAdmin latestMessage")
      .sort({ updatedAt: -1 });

    user = await User.populate(user, {
      path: "latestMessage.sender",
    });

    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Chat failed",
    });
  }
};

const createGroupChat = async (req, res) => {
  try {
    let { users, name } = req.body;
    if (!users || !name) {
      return res.status(400).json({
        message: "Should provide user and group name",
      });
    }

    users = JSON.parse(users);
    if (users.length < 2) {
      return res.status(400).json({
        message: "More than two members to create a group",
      });
    }

    users.push(req.user);

    const groupChat = await Chat.create({
      isGroupChat: true,
      chatName: name,
      users: users,
      groupAdmin: req.user,
    });

    let fullGroupChat = await Chat.findById(groupChat._id).populate(
      "users groupAdmin latestMessgae"
    );
    return res.status(200).json({
      fullGroupChat,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Could not make group",
    });
  }
};

const renameGroup = async (req, res) => {
  try {
    const { chatId, name } = req.body;
    if (!name || !chatId) {
      return res.status(400).json({
        message: "Please provide a name",
      });
    }

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        chatName: name,
      },
      {
        new: true,
      }
    ).populate("users groupAdmin latestMessage");

    if (!updatedChat) {
      return res.status(400).json({
        message: "Chat not found",
      });
    }

    return res.status(200).json({
      message: "Group name updated",
      updatedChat,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Group name could not update",
    });
  }
};

const addToGroup = async (req, res) => {
  try {
    const { chatId, userId } = req.body;
    const afterAddingUser = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      {
        new: true,
      }
    ).populate("users groupAdmin latestMessage");

    if(!afterAddingUser){
      return res.status(400).json({
        message : "Users add failed"
      })
    }

    return res.status(200).json({
      afterAddingUser
    })
  } catch (error) {
    return res.status(500).json({
      message : "Users add failed"
    })
  }
};

const removeFromGroup = async (req, res) => {
  try {
    const {chatId , user} = req.body;
    const afterRemovingUser = await Chat.findByIdAndUpdate(chatId,{
      $pull: {users : user}
    },{
      new : true
    })
    if(!afterRemovingUser){
      return res.status(400).json({
        message : "Users remove failed"
      })
    }

    return res.status(200).json({
      afterRemovingUser
    })
  } catch (error) {
    return res.status(500).json({
      message : "Users remove failed"
    })
  }
};

module.exports = {
  accessChat,
  getChats,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
};
