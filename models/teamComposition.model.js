// import sequelize from dbcoonfig
const sequelize = require("../databases/db.config");

// import DataTypes
const { DataTypes } = require("sequelize");

// project model
const { Employees } = require("./employee.model");
const { Project } = require("./project.model");

// create schema/model for team
exports.Team = sequelize.define(
  "projectTeam",
  {
    empId: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    projectId: {
      type: DataTypes.INTEGER,
      references: {
        model: Project,
        key: "projectId",
      },
    },
    firstName: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
    startDate: {
      type: DataTypes.STRING,
    },
    endDate: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    billingStatus: {
      type: DataTypes.STRING,
    },
    exposedToCustomer: {
      type: DataTypes.STRING,
    },
    allocationType: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

(async () => await this.Team.sync())();
