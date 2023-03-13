const expressAsyncHandler = require("express-async-handler");
const { User } = require("../models/users.model");

const roleMapping = expressAsyncHandler(async (req, res) => {
  // get the role and userId
  let { userId, role } = req.body;
  // check the user
  let findUser = await User.findOne({
    where: {
      userId: userId,
    },
  });
  // if userRecord is empty means no user found
  if (findUser == undefined) {
    res.send({ message: "There is no such user existed" });
  }
  // if user found
  else {
    await User.update({ role: role }, { where: { userId: userId } });
    res.send({ message: `${role} is mapped to ${findUser.firstName}` });
  }
});

// route for getting all the users

const allUsers = expressAsyncHandler(async (req, res) => {
  let allUsers = await User.findAll();

  res.send({ message: "All users data are: ", users: allUsers });
});

module.exports = { roleMapping, allUsers };

const pendignUsers = expressAsyncHandler(async (req, res) => {
  let allUsers = await User.findAll({
    where: {
      role: "waiting",
    },
  });
  console.log(allUsers);
  if (allUsers.length == 0) {
    res.send({ message: "There is no pending users" });
  } else {
    res.send({ message: "All users data are: ", users: allUsers });
  }
});

module.exports = { roleMapping, allUsers, pendignUsers };
