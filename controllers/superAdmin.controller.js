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

module.exports = roleMapping;
