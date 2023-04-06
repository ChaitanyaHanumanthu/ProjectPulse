// importing the express application
const express = require("express");

// creating mini router application
const userApp = express.Router();

// importing the controllers
const {
  register,
  login,
  allUsers,
  forgotpassword,
  resetPassword,
  getEmployees,
  getManagers,
} = require("../controllers/user.controller");

// route for creating an user
userApp.post("/register", register);

// route for loggin the user
userApp.post("/login", login);

// route for getting all the users
userApp.get("/users", allUsers);

// route for forgetting the password
userApp.post("/forgot-password", forgotpassword);

// route for resetting the password
userApp.post("/reset-password/email/:email", resetPassword);

// route for getting all the mangers
userApp.get("/managers", getManagers);

// route for getting all the employees
userApp.get("/employees", getEmployees)


// exporting the userApp
module.exports = userApp;
