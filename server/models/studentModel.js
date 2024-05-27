const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
// i used sequalize for optimize model defenition
const Student = sequelize.define("Student", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  dates: DataTypes.INTEGER,
  months: DataTypes.INTEGER,
  years: DataTypes.INTEGER,
  education: DataTypes.STRING,
  about: DataTypes.TEXT,
});

module.exports = Student;
