const expressAsyncHandler = require("express-async-handler");
const { Concerns } = require("../models/concerns.model");
const { Project } = require("../models/project.model");
const { Updates } = require("../models/updates.model");
const { User } = require("../models/users.model");

const getProjects = expressAsyncHandler(async (req, res) => {
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
  let allProjects = await Project.findAll({
    where: {
      GdoId: req.params.GdoId,
      projectId: req.params.projectId,
    },
  });
  res.send({
    message: "All the project details are here",
    Projects: allProjects,
  });
});

module.exports = { getProjects, getProjectById };
