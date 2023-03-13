const { DataTypes } = require("sequelize");
const sequelize = require("../databases/db.config");

exports.Employees = sequelize.define(
  "employees",
  {
    empId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    empName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
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
