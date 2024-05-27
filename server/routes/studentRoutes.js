const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.post('/create-student-details',studentController.createNewStudent)
router.get("/get-student-details",studentController.getStudentDetails)
router.delete("/delete-student-details/:id",studentController.deleteStudentDetails)
router.put("/update-student-details/:id",studentController.updateStudentDetails)


module.exports = router;
