const express = require("express");
const expressAsyncHandler = require("express-async-handler");

const adminApp = express.Router();

const {
  getProjects,
  createProject,
  getResourceRequests,
  getPorjectById,
} = require("..//controllers/admin.controller");

adminApp.get("/projects", getProjects);

adminApp.post("/project", createProject);

adminApp.get("/project/:projectId", getPorjectById);

adminApp.get("/resourceRequests", getResourceRequests);

module.exports = adminApp;
