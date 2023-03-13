const expressAsyncHandler = require("express-async-handler");
const { Project } = require("../models/project.model");
const { Updates } = require("../models/updates.model");
const { Concerns } = require("../models/concerns.model");
const { Team } = require("../models/teamComposition.model");
const { Resource } = require("../models/raiseResource.model");

const getProjectPortfolioashboard = expressAsyncHandler(async (req, res) => {
  let GdoId = req.params.GdoId;
  console.log(Updates.User);
  let allProjects = await Project.findAll({
    where: {
      GdoId: GdoId,
    },
    attributes: [
      "projectId",
      "projectName",
      "client",
      "clientAccountManager",
      "statusOfProject",
      "startDate",
      "endDate",
      "projectFitnessIndicator",
    ],
  });
  res.send({
    message: "All the project details are here",
    Projects: allProjects,
  });
});

const getProjectById = expressAsyncHandler(async (req, res) => {
  let allProjects = await Project.findOne({
    where: {
      projectId: req.params.projectId,
      GdoId: req.params.GdoId,
    },
    attributes: { exclude: ["projectManager_id", "hrManager_id", "GdoId"] },
    include: [
      {
        association: Project.Updates,
        attributes: { exclude: ["id", "userId"] },
      },
      { association: Project.Concerns, attributes: { exclude: ["projectId"] } },
      { association: Project.Team },
    ],
  });
  if (allProjects == undefined) {
    res.send({ message: "There is no projects existed with projectId" });
  } else {
    //  return project fitness, concern indicator ,Team members get these values from projectRecord
    let projectFitness = allProjects.dataValues.projectFitnessIndicator;
    // find team size
    let teamSize = allProjects.projectTeams.length;
    // find number of concerns is active
    let concernIndicator = 0;
    allProjects.concerns.forEach((concern) => {
      if (concern.concernStatus == "notSolved") concernIndicator++;
    });
    res.send({
      message: `Here is the DETAILED VIEW OF THE PROJECT`,
      Project_Fitness: projectFitness,
      Concerns_Indicator: concernIndicator,
      teamSiz: teamSize,
      Details: `All the project details are here`,
      Projects: allProjects,
    });
  }
});

// route for getting all concerns

const getConcerns = expressAsyncHandler(async (req, res) => {
  let GdoId = req.params.GdoId;
  let allConcerns = await Concerns.findAll({
    where: {
      concernRaisedBy: GdoId,
    },attributes:{exclude:["userId"]}
  });
  if (allConcerns.length == 0) {
    res.send({ message: "There is no concerns" });
  } else {
    res.send({ message: "All concerns are: ", concerns: allConcerns });
  }
});

// Team composition
const addTeam = expressAsyncHandler(async (req, res) => {
  let team = await Team.create(req.body);
  res.send({ Message: "Team added Successfully", Team: team });
});

// raising a resource request
const raiseResourceRequest = expressAsyncHandler(async (req, res) => {
  let projectId = req.body.projectId;
  let resourceRequest = await Resource.create(req.body);
  res.send({
    message: `The resource request was raised by ${resourceRequest.gdoId}`,
  });
});

module.exports = {
  getProjectPortfolioashboard,
  getProjectById,
  getConcerns,
  addTeam,
  raiseResourceRequest,
};
