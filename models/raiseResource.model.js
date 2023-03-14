// import sequelize from dbconfig
const sequelize = require("../databases/db.config");
const { DataTypes } = require("sequelize");

// import User model
const { User } = require("../models/users.model");

// import Project model
const { Project } = require("../models/project.model");

// create schema for resourcing request
exports.Resource = sequelize.define(
  "resource",
  {
    resourceId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    gdoId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "userId",
      },
    },
    projectId: {
      type: DataTypes.INTEGER,
      references: {
        model: Project,
        key: "projectId",
      },
    },
    requestDesc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
