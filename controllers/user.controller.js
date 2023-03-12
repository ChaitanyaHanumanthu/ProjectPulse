// Importing express async handler
const expressAsyncHandler = require("express-async-handler");

// importing jwt
const bcryptjs = require("bcryptjs");

// import json Web Token
const jwt = require("jsonwebtoken");

// importing models from the sequelize
const { User } = require("../models/users.model");

// router for register the user
const register = expressAsyncHandler(async (req, res) => {
  let password = req.body.password;
  // hashing the password
  let hashedpwd = await bcryptjs.hash(password, 5);

  // assigning the hased password to the request body
  req.body.password = hashedpwd;
  let create = await User.create(req.body);
  res.send({ message: "User created", payload: create });
});

// route for logging in
const login = expressAsyncHandler(async (req, res) => {
  let { email, password } = req.body;
  let findUser = await User.findOne({ where: { email: email } });
  if (
    findUser != undefined &&
    (await bcryptjs.compare(password, findUser.dataValues.password))
  ) {
    let signedToken = jwt.sign(
      { name: findUser.dataValues.role },
      process.env.secret_key,
      { expiresIn: "1h" }
    );
    res.send({
      message: `Welcome back ${findUser.dataValues.firstName}`,
      payload: signedToken,
    });
  } else if (findUser == undefined) {
    res.send({ message: "No such user existed, Kindly register" });
  } else {
    res.send({ message: "Wrong password, try again" });
  }
});

// User role mapping
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
    let updateUserRole = await User.update(
      { role: role },
      {
        where: {
          userId: userId,
        },
      }
    );
    res.send({ message: `${role} is mapped to ${findUser.firstName}` });
  }
});

// route for getting all the users
const allUsers = expressAsyncHandler(async (req, res) => {
  let allUsers = await User.findAll();
  res.send({ message: "All users in the database: ", users: allUsers });
});

//

module.exports = { register, login, roleMapping, allUsers };
