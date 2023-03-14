const { DataTypes } = require("sequelize");
const sequelize = require("../databases/db.config");
const { Project } = require("./project.model");
const { User } = require("./users.model");

exports.Concerns = sequelize.define(
  "concerns",
  {
    concernId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    concernDesc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    concernRaisedBy: {
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
    concernRaisedDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    concernSeverity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    concernByClient: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    concernStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    concernMitigatedDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    timestamps: false,
    freezeTableName: true,
  }
);
