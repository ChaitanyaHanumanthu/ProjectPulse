// importing express application
const express = require("express");

// creating mini app
const superAdminApp = express.Router(); //superAdminAppp

// importing rolemapping from controller
const {
  roleMapping,
  allUsers,
  pendignUsers,
  deleteUsers,
} = require("../controllers/superAdmin.controller");

// route for update the role
superAdminApp.put("/role-update/:userId", roleMapping);

// routes for getting all the users
superAdminApp.get("/users", allUsers);

// route for getting all the role pending users
superAdminApp.get("/pendingUsers", pendignUsers);

// route for deletig the users based on the id
superAdminApp.delete("/delete/:userId", deleteUsers);

//exporting superAdminApp
module.exports = superAdminApp;
