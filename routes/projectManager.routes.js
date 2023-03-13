const express = require("express");
// creating mini router application
const managerApp = express.Router();

// importing the controllers
const {raiseUpdate,getAllUpdates,raiseConcern,getAllConcerns,} = require("../controllers/projectManager.controller");

// route for creating an update
managerApp.post("/update", raiseUpdate);

// route for posting an concern
managerApp.post("/concern", raiseConcern);

// route for getting all the updates
managerApp.get("/project/:projectId/updates", getAllUpdates);

// routue for getting all the concerns
managerApp.get("/project/:projectId/concerns", getAllConcerns);

// exporting the projectManagerApp
module.exports = managerApp;
