const { DataTypes } = require("sequelize");
const sequelize = require("../databases/db.config");
const { Project } = require("./project.model");
const { User } = require("./users.model");

exports.Updates = sequelize.define(
  "updates",
  {
    updateId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    projectStatusUpdate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
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
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    scheduleStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resourcingStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qualityStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    waitingForClientInput: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    timestamps: false,
    freezeTableName: true,
  }
);
