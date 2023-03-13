// importing express async handler
const expressAsyncHandler = require("express-async-handler");

// importing required models
const { Project } = require("../models/project.model");
const { Resource } = require("../models/raiseResource.model");

// controller  for getting all projects
const getProjects = expressAsyncHandler(async (req, res) => {
  let allProjects = await Project.findAll({
    // including all the associations that are mentioned
    include: [
      { association: Project.Updates },
      { association: Project.Concerns },
    ],
  });
  res.send({
    message: "All the project details are here",
    Projects: allProjects,
  });
});

// controller for getting the projects by id
const getPorjectById = expressAsyncHandler(async (req, res) => {
  let findProject = await Project.findOne({
    where: {
      projectId: req.params.projectId,
    },
    include: [
      { association: Project.Updates },
      { association: Project.Concerns },
    ],
  });
  // if there are no projects with id
  if (findProject == undefined) {
    res.send({ message: "There is no such project existed with id" });
  } else {
    // projects with the particular id
    res.send({
      message: "The particular project details are: ",
      Project: findProject,
    });
  }
});

// route for creating and assigning a project
const createProject = expressAsyncHandler(async (req, res) => {
  let projectCreation = await Project.create(req.body);
  res.send({
    message: "Project is created and assigned",
    payload: projectCreation,
  });
});

// controller for getting all the resource requests
const getResourceRequests = expressAsyncHandler(async (req, res) => {
  let resources = await Resource.findAll();
  // if there are no resources
  if (resources == undefined) {
    res.send({ message: "There is no resource requests" });
    // if there are more than one resources
  } else {
    res.send({
      message: "Resources raised by GDO's are: ",
      resourcedate: resources,
    });
  }
});

module.exports = {
  getProjects,
  createProject,
  getPorjectById,
  getResourceRequests,
};
