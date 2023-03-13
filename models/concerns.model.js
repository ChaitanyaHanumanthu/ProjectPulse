const { DataTypes } = require("sequelize");
const sequelize = require("../databases/db.config");
const { User } = require("./users.model");

exports.Concerns = sequelize.define(
  "concerns",
  {
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
      type: DataTypes.DATE,
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
