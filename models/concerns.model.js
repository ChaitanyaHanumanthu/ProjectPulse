const { DataTypes } = require("sequelize");
const sequelize = require("../databases/db.config");

exports.Concerns = sequelize.define(
  "concerns",
  {
    concernDesc: {
      type: DataTypes.STRING,
      allowNull: false,
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
