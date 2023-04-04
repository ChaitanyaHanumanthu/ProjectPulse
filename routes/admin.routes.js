// importing express module
const express = require("express");

// creating mini app using router
const adminApp = express.Router();

// importing all the controllers that are in admin controller
const {
  getProjects,
  createProject,
  getResourceRequests,
  getPorjectById,
  deleteProject,
  updateProjectById,
  updatesOfProject,
  concernsOfProject,
} = require("..//controllers/admin.controller");

// route for getting all projects
adminApp.get("/projects", getProjects);

// route for create new project
adminApp.post("/project", createProject);

// route for get the projects based on Id
adminApp.get("/project/:projectId", getPorjectById);

// route for get the resource requests
adminApp.get("/resourceRequests", getResourceRequests);

// route for update the project
adminApp.put("/update-project/:projectId", updateProjectById);

// route for delete the project
adminApp.put("/project/:projectId", deleteProject);

// route for getting all the updates of the project
adminApp.get("/updates/:projectId", updatesOfProject);

// route for getting all the concerns of the project
adminApp.get("/concerns/:projectId", concernsOfProject);

// exporting the mini admin app
module.exports = adminApp;
