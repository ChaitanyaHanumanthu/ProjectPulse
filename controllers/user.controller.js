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
const { ConnectionRefusedError } = require("sequelize");
const { Employees } = require("../models/employee.model");

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
  try {
    let password = req.body.password;
    // hashing the password
    let hashedpwd = await bcryptjs.hash(password, 5);

    // assigning the hased password to the request body
    req.body.password = hashedpwd;
    let create = await User.create(req.body);
    res.status(200).send({ message: "User created", payload: create });
  } catch (err) {
    res.send({ message: "Email already existed" });
  }
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
      { expiresIn: "12h" }
    );
    res.status(200).send({
      message: `Welcome back`,
      //  ${
      //   findUser.dataValues.firstName + " " + findUser.dataValues.lastName
      // }`,
      payload: findUser,
      token: signedToken,
    });
  } else if (findUser == undefined) {
    res.status(200).send({ message: "No such user existed, Kindly register" });
  } else {
    res.status(200).send({ message: "Wrong password, try again" });
  }
});

// getting all the mangaers
const getManagers = expressAsyncHandler(async (req, res) => {
  let project_managers = await User.findAll({ where: { role: "manager" } });
  let hr_Managers = await User.findAll({ where: { role: "hr" } });
  let gdo_Managers = await User.findAll({ where: { role: "gdo" } });
  res.send({ managers: project_managers, hr: hr_Managers, gdo: gdo_Managers });
});

// forgot password
const forgotpassword = expressAsyncHandler(async (req, res) => {
  //generating 6 digit random number as otp
  let otp = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
  //add OTP to otps
  otps[req.body.email] = otp;
  console.log("otp", otp);
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
  res
    .status(200)
    .send({ message: "OTP to reset your password is sent to your email" });
});

// route for getting all the users
const allUsers = expressAsyncHandler(async (req, res) => {
  let allUsers = await User.findAll();
  if (allUsers.length == 0) {
    res.status(200).send({ message: "There are no users existed" });
  } else {
    res
      .status(200)
      .send({ message: "All users in the database: ", users: allUsers });
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
    res.status(200).send({ message: "Password reset sucessfully" });
  } else {
    res.status(403).send({ message: "Invalid OTP, try again" });
  }
});

// controller for getting all the employees
const getEmployees = expressAsyncHandler(async (req, res) => {
  let employees = await Employees.findAll();
  res.send({ message: "Employees are", payload: employees });
});
// exporting the controllers - request handlers
module.exports = {
  register,
  login,
  allUsers,
  forgotpassword,
  resetPassword,
  getManagers,
  getEmployees,
};
