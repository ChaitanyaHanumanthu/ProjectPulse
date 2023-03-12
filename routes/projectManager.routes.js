const express = require("express");
// creating mini router application
const pjtMgrApp = express.Router();

// importing the verify token middleware
const verifyToken = require("../middlewares/verifytoken");

// importing the controllers
const {
  raiseUpdate,
  getAllUpdates,
  raiseConcern,
  getAllConcerns
} = require("../controllers/projectManager.controller");

// route for creating an update
pjtMgrApp.post("/update", raiseUpdate);

// route for posting an concern
pjtMgrApp.post("/concern", raiseConcern);

// route for getting all the updates
pjtMgrApp.get("/project/:projectId/updates", getAllUpdates);

// routue for getting all the concerns
pjtMgrApp.get("/project/:projectId/concerns", getAllConcerns)

module.exports = pjtMgrApp;
