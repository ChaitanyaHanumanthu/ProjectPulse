const expressAsyncHandler = require("express-async-handler");
const { Project } = require("../models/project.model");

// route for getting all projects
const getProjects = expressAsyncHandler(async (req, res) => {
  let allProjects = await Project.findAll({
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

// route for getting the projects by id
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

  res.send({
    message: "Th particular project details are: ",
    Project: findProject,
  });
});

// route for creating and assigning a project
const createProject = expressAsyncHandler(async (req, res) => {
  let projectCreation = await Project.create(req.body);
  res.send({
    message: "Project is created and assigned",
    payload: projectCreation,
  });
});

module.exports = { getProjects, createProject, getPorjectById };
