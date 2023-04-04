// importing express module
const express = require("express");

// creating mini app using router
const gdoApp = express.Router();

// importing all the controllers that are in admin controller
const {
  getProjectPortfolioashboard,
  getProjectById,
  getConcerns,
  addTeam,
  raiseResourceRequest,
} = require("..//controllers/gdo.controller");

// route for getting the projects dashboard
gdoApp.get("/gdo/:GdoId/projectPortfolioDashboard",getProjectPortfolioashboard);

// route for getting the projects based on the projectId
gdoApp.get("/project/:projectId", getProjectById);

// route for get the projects concern
gdoApp.get("/gdo/:GdoId/concerns", getConcerns);

// route for add the team composition
gdoApp.post("/gdo/:GdoId/add-team", addTeam);

// route for raising a project resource request
gdoApp.post("/gdo/:GdoId/raise-resource-request", raiseResourceRequest);

// exporting the mini gdo App
module.exports = gdoApp;
