const { where } = require("sequelize");
const Student = require("../models/studentModel");

// Controller functions for CRUD operations

exports.createNewStudent = async (req, res) => {
  try {
    const students = await Student.create(req.body);
    return res
      .status(201)
      .json({ message: "new student data created" + students });
  } catch (error) {
    return res
      .status(400)
      .json({ message:'uniqueERROR'});
  }
};

exports.getStudentDetails = async (req, res) => {
  try {
    const data = await Student.findAll();
    return res.status(200).json({ message: data });
  } catch (error) {
    return res.status(200).json({ message: "data extraction failed" + error });
  }
};

exports.deleteStudentDetails = async (req, res) => {
  try {
    const deleted = await Student.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      return res.status(200).json({ message: "student deleted" + deleted });
    } else {
      throw new Error("student not found");
    }
  } catch (error) {
    res.status(400).json({ message: "student deletion failed " });
  }
};

exports.updateStudentDetails = async (req, res) => {
  try {
    const [updated] = await Student.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedStudent = await Student.findByPk(req.params.id);
      return res
        .status(200)
        .json({ message: "student updated " + updatedStudent });
    }
    throw new Error("Student not found");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
