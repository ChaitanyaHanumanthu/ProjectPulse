// importing express application
const express = require("express");
const superAdminApp = express.Router(); //superAdminAppp 


// importing rolemapping from controller
const roleMapping = require("../controllers/superAdmin.controller");

// route for update the role
superAdminApp.put("/role-update", roleMapping);


//exporting superAdminApp
module.exports = superAdminApp;
