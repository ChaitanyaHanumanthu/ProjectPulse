// import sequelize from dbcoonfig
const sequelize = require("../databases/db.config");

// import DataTypes
const { DataTypes } = require("sequelize");

// project model
const { Employees } = require("./employee.model");

// create schema/model for team
exports.Team = sequelize.define(
  "projectTeam",
  {
    empId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: {
        model: Employees,
        key: "empId",
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
