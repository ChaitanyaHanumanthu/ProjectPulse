const express = require("express");
const gdoApp = express.Router();

const {
  getProjects,
  getProjectById,
} = require("..//controllers/gdo.controller");

gdoApp.get("/gdo/:GdoId/projects", getProjects);

gdoApp.get("/gdo/:GdoId/projects/:projectId", getProjectById);

module.exports = gdoApp;
