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
  deleteProject
} = require("..//controllers/admin.controller");

// route for getting all projects
adminApp.get("/projects", getProjects);

// route for create new project
adminApp.post("/project", createProject);

// route for get the projects based on Id
adminApp.get("/project/:projectId", getPorjectById);

// route for get the resource requests
adminApp.get("/resourceRequests", getResourceRequests);

// route for delete the project
adminApp.delete("/project/:projectId", deleteProject)

// exporting the mini admin app
module.exports = adminApp;
