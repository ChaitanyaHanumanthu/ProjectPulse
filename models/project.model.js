const { DataTypes } = require("sequelize");
const sequelize = require("../databases/db.config");
const { User } = require("./users.model");

exports.Project = sequelize.define(
  "projects",
  {
    projectId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    projectName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    client: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clientAccountManager: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    statusOfProject: {
      type: DataTypes.STRING,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      // allowNull: false,
    },
    endDate: {
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
      allowNull: true,
    },
    projectManager_id: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      references: {
        model: User,
        key: "userId",
      },
    },
    hrManager_id: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      references: {
        model: User,
        key: "userId",
      },
    },
    GdoId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "userId",
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    timestamps: false,
    freezeTableName: true,
  }
);

(async () => await this.Project.sync())();
