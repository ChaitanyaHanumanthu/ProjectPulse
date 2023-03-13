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
    include: [
      {
        association: Project.Updates,
        include: [
          {
            association: Updates.User,
            attributes: { exclude: ["password", "lastName", "email", "role"] },
          },
        ],
      },
      {
        association: Project.Concerns,
      },
      { association: Project.Team },
      { association: Project.Resource },
    ],
  });
  //  return project fitness, concern indicator ,Team members get these values from projectRecord
  let projectFitness = allProjects.dataValues.projectFitnessIndicator;
  // find team size
  // let teamSize = projectRecord.dataValues.employeeProjectDetails.length;
  // find number of concerns is active
  let concernIndicator = 0;
  allProjects.concerns.forEach((concern) => {
    if (concern.concernStatus == "notSolved") concernIndicator++;
  });
  res.send({
    message: `Here is the DETAILED VIEW OF THE PROJECT`,
    Project_Fitness: projectFitness,
    Concerns_Indicator: concernIndicator,
    Details: `All the project details are here`,
    Projects: allProjects,
  });
});

// route for getting all concerns

const getConcerns = expressAsyncHandler(async (req, res) => {
  let GdoId = req.params.GdoId;
  let allConcerns = await Concerns.findAll({
    where: {
      userId: GdoId,
    },
  });
  res.send({ message: "All concerns are: ", concerns: allConcerns });
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
