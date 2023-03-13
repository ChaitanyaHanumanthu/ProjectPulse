const express = require("express");
const gdoApp = express.Router();

const {
  getProjectPortfolioashboard,
  getProjectById,
  getConcerns,
  addTeam,
  raiseResourceRequest
} = require("..//controllers/gdo.controller");

gdoApp.get(
  "/gdo/:GdoId/projectPortfolioDashboard",
  getProjectPortfolioashboard
);

gdoApp.get("/gdo/:GdoId/projects/:projectId", getProjectById);

gdoApp.get("/gdo/:GdoId/concerns", getConcerns);

gdoApp.post("/gdo/:GdoId/add-team", addTeam);

gdoApp.post("/gdo/:GdoId/raise-resource-request", raiseResourceRequest)

module.exports = gdoApp;
