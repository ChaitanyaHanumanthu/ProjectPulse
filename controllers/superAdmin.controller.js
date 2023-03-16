// importing express - async - handler
const expressAsyncHandler = require("express-async-handler");

// importing required models
const { User } = require("../models/users.model");

// controller for rolemapping
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
    res.status(404).send({ message: "There is no such user existed" });
  }
  // if user found
  else {
    await User.update({ role: role }, { where: { userId: userId } });
    res.status(200).send({ message: `${role} is assigned to ${findUser.firstName}` });
  }
});

// controller for getting all the users
const allUsers = expressAsyncHandler(async (req, res) => {
  let allUsers = await User.findAll({attributes:{exclude:["password"]}});
  // if the users is empty
  if (allUsers.length == 0) {
    res.status(404).send({ message: "There are no reistered users" });
    // if there are more than one users
  } else {
    res.status(200).send({ message: "All users data are: ", users: allUsers });
  }
});

// controller for getting the role pending users
const pendignUsers = expressAsyncHandler(async (req, res) => {
  // finding all the users based on the role
  let allUsers = await User.findAll({
    where: {
      role: "null",
    },
  });
  // if the founder users length is 0
  if (allUsers.length == 0) {
    res.status(404).send({ message: "There is no pending users" });
    // if the founders user length is more than 1
  } else {
    res.status(200).send({ message: "All users data are: ", users: allUsers });
  }
});

// exporting all the controllers
module.exports = { roleMapping, allUsers, pendignUsers };
