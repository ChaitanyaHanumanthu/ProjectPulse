const { DataTypes } = require("sequelize");
const sequelize = require("../databases/db.config");

exports.Updates = sequelize.define(
  "updates",
  {
    projectStatusUpdate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
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
