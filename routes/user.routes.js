const express = require("express");
// creating mini router application
const userApp = express.Router();

// importing the controllers
const {
  register,
  login,
  roleMapping,
  allUsers,
} = require("../controllers/user.controller");

// route for creating an user
userApp.post("/register", register);

// route for loggin the user
userApp.post("/login", login);

// route for updating the roles
userApp.put("/role-update", roleMapping);

// route for getting all the users
userApp.get("/users", allUsers);

// exporting the userApp
module.exports = userApp;
