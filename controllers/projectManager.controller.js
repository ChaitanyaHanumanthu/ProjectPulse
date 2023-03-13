const expressAsyncHandler = require("express-async-handler");

const { Project } = require("../models/project.model");
const { Updates } = require("../models/updates.model");
const { Concerns } = require("../models/concerns.model");

const nodemailer = require("nodemailer");
const { Op } = require("sequelize");

require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: process.env.Email_Service,
  auth: {
    user: process.env.Email,
    pass: process.env.Email_Password, // app password
  },
});

const raiseUpdate = expressAsyncHandler(async (req, res) => {
  let projectUpdate = await Updates.create(req.body, {
    include: { association: Project.Updates },
  });
  res.send({
    message: `Update about the project by ${req.body.userId}`,
    update: projectUpdate,
  });
});

const raiseConcern = expressAsyncHandler(async (req, res) => {
  let projectUpdate = await Concerns.create(req.body, {
    include: { association: Project.Concerns },
  });

  let mailOptions = {
    from: "pulseproject006@gmail.com",
    to: "noreplytoomee@gmail.com",
    subject: `Project concern is raised for the project ${req.body.projectId}`,
    text: `Concern raised,
      A project concern is raised by one of the team, kindly refer the details below
     Concern Description: ${req.body.concernDesc}
     severity:${req.body.concernSeverity} `,
  };
  //send email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  res.send({
    message: `Concern about the project by ${req.body.concernRaisedBy}`,
    Concern: projectUpdate,
  });
});

const getAllUpdates = expressAsyncHandler(async (req, res) => {
  let allUpdates = await Updates.findAll({
    where: { projectId: req.params.projectId },
  });
  if (allUpdates.length == 0) {
    res.send({
      message: `There is no Updates under this project id ${req.params.projectId}`,
    });
  } else {
    res.send({
      message: `All updates from the project ${allUpdates.projectId}`,
      updates: allUpdates,
    });
  }
});

const getAllConcerns = expressAsyncHandler(async (req, res) => {
  let allConcerns = await Concerns.findAll({
    where: { projectId: req.params.projectId },
  });
  if (allConcerns.length == 0) {
    res.send({
      message: `There is no concerns under this project id ${req.params.projectId}`,
    });
  } else {
    res.send({
      message: `All Concerns from the project ${allConcerns.projectId}`,
      concerns: allConcerns,
    });
  }
});

module.exports = { raiseUpdate, getAllUpdates, raiseConcern, getAllConcerns };
