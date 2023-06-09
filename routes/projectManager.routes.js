// importing the express module
const express = require("express");

// creating mini router application
const managerApp = express.Router();

// importing the controllers
const {
  raiseUpdate,
  getAllUpdates,
  raiseConcern,
  getAllConcerns,
  deleteUpdate,
  getLastTwoWeekUpdates,
  getProjectsUnderPm,
  projectById,
} = require("../controllers/projectManager.controller");

// route for creating an update
managerApp.post("/update/:projectId", raiseUpdate);

// route for posting an concern
managerApp.post("/concern/:projectId", raiseConcern);

// route for getting all the updates
managerApp.get("/project/:projectId/all-updates", getAllUpdates);

// routes for getting all the projects under him
managerApp.get("/project-manager/project/:projectManager_id", getProjectsUnderPm);

// route for getting all the updates from last two weeks
managerApp.get("/project/:projectId/2-week-updates", getLastTwoWeekUpdates);

// routue for getting all the concerns
managerApp.get("/project/:projectId/concerns", getAllConcerns);

// route for delete the concern
managerApp.delete("/project/project-update/:id", deleteUpdate);

// route for getting the project details
managerApp.get("/project/:projectId", projectById);

// exporting the projectManagerApp
module.exports = managerApp;
