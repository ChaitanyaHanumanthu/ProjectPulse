const { DataTypes } = require("sequelize");
const sequelize = require("../databases/db.config");

exports.Project = sequelize.define(
  "projects",
  {
    projectId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      // autoIncrement: true,
    },
    projectName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    client: {
      type: DataTypes.STRING,
    },
    statusOfProject: {
      type: DataTypes.STRING,
    },
    projectStartDate: {
      type: DataTypes.DATEONLY,
      // allowNull: false,
    },
    projectEndDate: {
      type: DataTypes.DATEONLY,
      // allowNull: false,
    },
    projectFitnessIndicator: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    domainOfProject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    typeOfProject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    teamSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    projectManager_id: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    hrManager_id: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    timestamps: false,
    freezeTableName: true,
  }
);
