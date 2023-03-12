const expressAsyncHandler = require("express-async-handler");
const { Project } = require("../models/project.model");
const { Updates } = require("../models/updates.model");

const getProjects = expressAsyncHandler(async (req, res) => {
  let GdoId = req.params.GdoId;
  console.log(Updates.User);
  let allProjects = await Project.findAll({
    where: {
      GdoId: GdoId,
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
    ],
  });
  res.send({
    message: "All the project details are here",
    Projects: allProjects,
  });
});

const getProjectById = expressAsyncHandler(async (req, res) => {
  let allProjects = await Project.findAll({
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
    ],
  });
  res.send({
    message: "All the project details are here",
    Projects: allProjects,
  });
});

module.exports = { getProjects, getProjectById };
