// importing express application
const express = require("express");

// creating mini app
const superAdminApp = express.Router(); //superAdminAppp 


// importing rolemapping from controller
const {roleMapping, allUsers, pendignUsers} = require("../controllers/superAdmin.controller");

// route for update the role
superAdminApp.put("/role-update", roleMapping);

// routes for getting all the users
superAdminApp.get("/users", allUsers)


// route for getting all the role pending users
superAdminApp.get("/pendingUsers", pendignUsers)


//exporting superAdminApp
module.exports = superAdminApp;
