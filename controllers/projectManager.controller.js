const expressAsyncHandler = require("express-async-handler");

const { Project } = require("../models/project.model");
const { Updates } = require("../models/updates.model");
const { Concerns } = require("../models/concerns.model");

const raiseUpdate = expressAsyncHandler(async (req, res) => {
  let projectUpdate = await Updates.create(req.body, {
    include: {association: Project.Updates},
  });
  res.send({
    message: `Update about the project by ${req.body.userId}`,
    update: projectUpdate,
  });
});

const raiseConcern = expressAsyncHandler(async (req, res) => {
  let projectUpdate = await Concerns.create(req.body, {
    include: {association: Project.Concerns},
  });
  res.send({
    message: `Update about the project by ${req.body.userId}`,
    Concern: projectUpdate,
  });
});

const getAllUpdates = expressAsyncHandler(async (req, res) => {
  let allUpdates = await Updates.findAll({
    where: {projectId: req.params.projectId},
  });
  res.send({
    message: `All updates from the project ${allUpdates.projectId}`,
    updates: allUpdates,
  });
});

const getAllConcerns = expressAsyncHandler(async (req, res) => {
  let allConcerns = await Concerns.findAll({
    where: {projectId: req.params.projectId},
  });
  res.send({
    message: `All Concerns from the project ${allConcerns.projectId}`,
    concerns: allConcerns,
  });
});

module.exports = { raiseUpdate, getAllUpdates, raiseConcern, getAllConcerns };
