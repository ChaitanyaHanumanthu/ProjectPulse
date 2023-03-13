// importing express-async-handler
const expressAsyncHandler = require("express-async-handler");

// importing requried models
const { Project } = require("../models/project.model");
const { Updates } = require("../models/updates.model");
const { Concerns } = require("../models/concerns.model");

// importing nodeMailer to send mails
const nodemailer = require("nodemailer");

// importing OP
const { Op } = require("sequelize");

// importing process.env files to access the content
require("dotenv").config();

// assigning transporter which will make the authentication connection
const transporter = nodemailer.createTransport({
  service: process.env.Email_Service,
  auth: {
    user: process.env.Email,
    pass: process.env.Email_Password, // app password
  },
});

// here is the controller for raising an update
const raiseUpdate = expressAsyncHandler(async (req, res) => {
  let projectUpdate = await Updates.create(req.body, {
    include: { association: Project.Updates },
  });
  res.send({
    message: `Update about the project by ${req.body.userId}`,
    update: projectUpdate,
  });
});

// This is for raising a concern
const raiseConcern = expressAsyncHandler(async (req, res) => {
  let projectUpdate = await Concerns.create(req.body, {
    include: { association: Project.Concerns },
  });

  // declaring the options, that will be sent in email
  let mailOptions = {
    from: "pulseproject006@gmail.com",
    to: "noreplytoomee@gmail.com",
    subject: `Project concern is raised for the project ${req.body.projectId}`,
    text: `Concern raised,
      A project concern is raised by one of the team, kindly refer the details below
     Concern Description: ${req.body.concernDesc}
     severity:${req.body.concernSeverity} `,
  };

  //Sending email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  // confirmation response
  res.send({
    message: `Concern about the project by ${req.body.concernRaisedBy}`,
    Concern: projectUpdate,
  });
});

// controller for get all the updates
const getAllUpdates = expressAsyncHandler(async (req, res) => {
  let allUpdates = await Updates.findAll({
    where: { projectId: req.params.projectId },
  });
  // If there is no updates
  if (allUpdates.length == 0) {
    res.send({
      message: `There is no Updates under this project id ${req.params.projectId}`,
    });
  }
  // if there are more than one updates
  else {
    res.send({
      message: `All updates from the project ${allUpdates.projectId}`,
      updates: allUpdates,
    });
  }
});

// controller for getting the updates before two weeks
const getLastTwoWeekUpdates = expressAsyncHandler(async (req, res) => {
  // getting all the updates
  let allUpdates = await Updates.findAll({
    where: { projectId: req.params.projectId },
  });
  // if the update count is 0
  if (allUpdates.length == 0) {
    res.send({
      message: `There is no Updates under this project id ${req.params.projectId}`,
    });
  }
  // If updates are more than one in last two weeks
  else {
    // retrieveing the project updates only before 2 weeks
    // let today = new Date();
    // let beforeTwoWeeks = new Date();
    // beforeTwoWeeks.setDate(today.getDate() - 14);

    // let lastTwoWeekUpdates = await allUpdates.getProjectUpdates({
    //   where: {
    //     date: {
    //       [Op.between]: [beforeTwoWeeks, today],
    //     },
    //   },
    // });
    res.send({
      message: `All updates from the project ${allUpdates.projectId}`,
      updates: allUpdates,
    });
  }
});

// controller for deleting update
const deleteUpdate = expressAsyncHandler(async (req, res) => {
  // hard deleting the updates
  await Updates.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.send({ message: "Project update deleted" });
});

// controller for get all the concerns
const getAllConcerns = expressAsyncHandler(async (req, res) => {
  let allConcerns = await Concerns.findAll({
    where: { projectId: req.params.projectId },
  });
  // if the concern count is 0
  if (allConcerns.length == 0) {
    res.send({
      message: `There is no concerns under this project id ${req.params.projectId}`,
    });
    // if the concern count is more than 1
  } else {
    res.send({
      message: `All Concerns from the project ${allConcerns.projectId}`,
      concerns: allConcerns,
    });
  }
});

// exporting the controllers
module.exports = {
  raiseUpdate,
  getAllUpdates,
  raiseConcern,
  getAllConcerns,
  deleteUpdate,
};
