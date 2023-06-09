// importing express async handler
const expressAsyncHandler = require("express-async-handler");

// importing required models
const { Project } = require("../models/project.model");
const { Resource } = require("../models/raiseResource.model");
const { Updates } = require("../models/updates.model");
const { Concerns } = require("../models/concerns.model");

// controller  for getting all projects
const getProjects = expressAsyncHandler(async (req, res) => {
  let allProjects = await Project.findAll({
    // including all the associations that are mentioned
    include: [
      { association: Project.Updates },
      { association: Project.Concerns },
      { association: Project.Team },
    ],
    where: {
      status: true,
    },
  });
  if (allProjects.length == 0) {
    res.status(200).send({ message: "There is no projects to display" });
  } else {
    res.status(200).send({
      message: "All the project details are here",
      Projects: allProjects,
    });
  }
});

// controller for getting the projects by id
const getPorjectById = expressAsyncHandler(async (req, res) => {
  let findProject = await Project.findOne({
    where: { projectId: req.params.projectId },
    include: [
      { association: "updates" },
      { association: "concerns" },
      { association: Project.Team },
    ],
  });
  // if there are no projects with id
  if (findProject == undefined) {
    res
      .status(200)
      .send({ message: "There is no such project existed with id" });
  } else {
    // projects with the particular id
    res.status(200).send({
      message: "The particular project details are: ",
      payload: findProject,
    });
  }
});

// route for creating and assigning a project
const createProject = expressAsyncHandler(async (req, res) => {
  let projectCreation = await Project.create(req.body);
  res.status(201).send({
    message: "Project is created and assigned",
    payload: projectCreation,
  });
});

// controller for updating the project
const updateProjectById = expressAsyncHandler(async (req, res) => {
  // checking the where condition and modifying the existed project
  let updation = await Project.update(req.body, {
    where: {
      projectId: req.params.projectId,
    },
  });
  res.status(200).send({
    message: `The project with id ${req.params.projectId} is updated`,
    // updatedProject: req.body,
  });
});

// controller for getting all the resource requests
const getResourceRequests = expressAsyncHandler(async (req, res) => {
  let resources = await Resource.findAll();
  // if there are no resources
  if (resources.length == 0) {
    res.status(200).send({ message: "There is no resource requests" });
    // if there are more than one resources
  } else {
    res.status(201).send({
      message: "Resources raised by GDO's are: ",
      payload: resources,
    });
  }
});

// controller for deleting a project
// const deleteProject = expressAsyncHandler(async (req, res) => {
//   await Project.destroy({ where: { projectId: req.params.projectId } });
//   res
//     .status(200)
//     .send({ message: `Project with ${req.params.projectId} is deleted ` });
// });

const deleteProject = expressAsyncHandler(async (req, res) => {
  console.log(req.params.projectId);
  await Project.update(req.body, {
    where: {
      projectId: req.params.projectId,
    },
  });
  res.send({ message: "Project Deleted Successfully" });
});

// controller for getting the updates
const updatesOfProject = expressAsyncHandler(async (req, res) => {
  let updates = await Updates.findAll({
    where: {
      projectId: req.params.projectId,
    },
  });
  if (updates.length == 0) {
    res.send({ message: "No updates for this project" });
  } else {
    res.send({ updates: updates });
  }
});

//  controller for getting the concerns
// controller for getting the updates
const concernsOfProject = expressAsyncHandler(async (req, res) => {
  let concerns = await Concerns.findAll({
    where: {
      projectId: req.params.projectId,
    },
  });
  if (concerns.length == 0) {
    res.send({ message: "No concerns for this project" });
  } else {
    res.send({ concerns: concerns });
  }
});

module.exports = {
  getProjects,
  createProject,
  getPorjectById,
  getResourceRequests,
  deleteProject,
  updatesOfProject,
  updateProjectById,
  concernsOfProject,
};
