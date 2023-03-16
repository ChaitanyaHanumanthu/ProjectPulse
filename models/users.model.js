const { DataTypes } = require("sequelize");
const sequelize = require("../databases/db.config");
const {Employees} = require("./employee.model")

exports.User = sequelize.define(
  "users",
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,references:{
        model: Employees, 
        key: "empId"
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      // validate: {
      //   isEmail: true,
      //   contains: "@westagilelabs.com",
      // },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "null",
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    timestamps: false,
    freezeTableName: true,
  }
);
