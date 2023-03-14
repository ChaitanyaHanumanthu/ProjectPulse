// Importing express async handler
const expressAsyncHandler = require("express-async-handler");

// importing jwt
const bcryptjs = require("bcryptjs");

// import json Web Token
const jwt = require("jsonwebtoken");

// importing models from the sequelize
const { User } = require("../models/users.model");

// importing dotenv file
require("dotenv").config();

// importing nodemailer
const nodemailer = require("nodemailer");

// assigning transporter which will make the authentication connection
const transporter = nodemailer.createTransport({
  service: process.env.Email_Service,
  auth: {
    user: process.env.Email,
    pass: process.env.Email_Password, // app password
  },
});

let otps = {};

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
      { role: findUser.dataValues.role, email: findUser.dataValues.email },
      process.env.secret_key,
      { expiresIn: "24h" }
    );
    res.send({
      message: `Welcome back ${
        findUser.dataValues.firstName + " " + findUser.dataValues.lastName
      }`,
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
  let { userId, role } = req.body;
  let findUser = await User.findOne({
    where: { userId: userId },
  });
  if (findUser == undefined) {
    res.send({ message: "There is no such user existed" });
  } else {
    let updateUserRole = await User.update(
      { role: role },
      { where: { userId: userId } }
    );
    res.send({ message: `${role} is mapped to ${findUser.firstName}` });
  }
});

const forgotpassword = expressAsyncHandler(async (req, res) => {
  //generating 6 digit random number as otp
  let otp = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
  //add OTP to otps
  otps[req.body.email] = otp;
  console.log(otps[req.body.email]);
  console.log(otps);
  //draft email
  let mailOptions = {
    from: "pulseproject006@gmail.com",
    to: req.body.email,
    subject: "Here is the OTP to reset your password",
    text:
      `Hi ${req.body.email},
      We received a request to reset yout password , -This otp is valid for only 5 minutes - Use below otp to reset the password :  
        ` + otp,
  };
  //send email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  //setting validity to OTP
  setTimeout(() => {
    //delete OTP from object
    delete otps[req.body.email];
  }, 30000);
  res.send({ message: "OTP to reset your password is sent to your email" });
});

// route for getting all the users
const allUsers = expressAsyncHandler(async (req, res) => {
  let allUsers = await User.findAll();
  if (allUsers.length==0) {
    res.send({ message: "There are no users existed" });
  } else {
    res.send({ message: "All users in the database: ", users: allUsers });
  }
});

//route for reset the password
const resetPassword = expressAsyncHandler(async (req, res) => {
  console.log(otps[req.params.email]);
  let pwd = req.body.password;
  password = await bcryptjs.hash(pwd, 6);
  req.body.password = password;
  //otp matches
  if (req.body.otp == otps[req.params.email]) {
    await User.update(
      { password: req.body.password },
      {
        where: {
          email: req.params.email,
        },
      }
    );
    res.send({ message: "Password reset sucessfully" });
  } else {
    res.send({ message: "Invalid OTP, try again" });
  }
});

// exporting the controllers - request handlers
module.exports = {
  register,
  login,
  roleMapping,
  allUsers,
  forgotpassword,
  resetPassword,
};
