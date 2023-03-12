const express = require("express");
const expressAsyncHandler = require("express-async-handler");

const adminApp = express.Router();


const {
  getProjects,
  createProject,
  getPorjectById,
} = require("..//controllers/admin.controller");

adminApp.get("/projects", getProjects);

adminApp.post("/project", createProject);

adminApp.get("/project/:projectId", getPorjectById);

module.exports = adminApp;
