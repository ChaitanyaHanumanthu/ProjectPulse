// import expressAsyncHandler
const expressAsyncHandler = require("express-async-handler");



// importing all required models
const { Project } = require("../models/project.model");
const { Concerns } = require("../models/concerns.model");
const { Team } = require("../models/teamComposition.model");
const { Resource } = require("../models/raiseResource.model");
const { User } = require("../models/users.model");



// controller for the projectPortfolioDashboard
const getProjectPortfolioashboard = expressAsyncHandler(async (req, res) => {
  let GdoId = req.params.GdoId;
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
  let gdo = await User.findOne({where:{userId: GdoId}})
  // if there are no projects
  if (allProjects.length == 0) {
    res.send({ message: "There are no projects to display" });
    // if there are more than one projects to display
  } else {
    res.send({
      message: `All the project details of ${gdo.dataValues.firstName +" "+ gdo.dataValues.lastName} are here`,
      Projects: allProjects,
    });
  }
});



// controller for getting the projects by projectId
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
    let indicator = 0;
    allProjects.concerns.forEach((concern) => {
      if (concern.concernStatus == "notSolved") indicator++;
    });

    res.send({
      message: `Here is the DETAILED VIEW OF THE PROJECT`,
      Project_Fitness: projectFitness,
      Concerns_Indicator: indicator,
      teamSiz: teamSize,
      Details: `All the project details are here`,
      Projects: allProjects,
    });
  }
});



// controller for getting all concerns
const getConcerns = expressAsyncHandler(async (req, res) => {
  let GdoId = req.params.GdoId;
  let allConcerns = await Concerns.findAll({
    where: {
      concernRaisedBy: GdoId,
    },
    attributes: { exclude: ["userId"] },
  });
  // if there is no concerns
  if (allConcerns.length == 0) {
    res.send({ message: "There is no concerns" });
    // if there are more than concerns
  } else {
    res.send({ message: "All concerns are: ", concerns: allConcerns });
  }
});



// controller for adding team composition
const addTeam = expressAsyncHandler(async (req, res) => {
  let GdoId = req.params.GdoId;
  let gdoCheck = await User.findOne({ where: { userId: GdoId } });
  if (gdoCheck == undefined) {
    res.send({ Message: `There is no gdo existed with id ${GdoId}` });
  } else {
    let team = await Team.create(req.body);
    res.send({ Message: "Team added Successfully", Team: team });
  }
});



// controller for raising resource request
const raiseResourceRequest = expressAsyncHandler(async (req, res) => {
  let projectId = req.body.projectId;
  let resourceRequest = await Resource.create(req.body);
  res.send({
    message: `The resource request was raised by ${resourceRequest.gdoId}`,
  });
});




// exporting the controllers
module.exports = {
  getProjectPortfolioashboard,
  getProjectById,
  getConcerns,
  addTeam,
  raiseResourceRequest,
};
