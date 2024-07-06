const express = require('express');
const router = express.Router();

const{auth, isStudent,isAdmin,isInstructor} = require("../middlewares/auth")
const{createCourse,getCourseDetails, showAllCourses } = require("../controllers/Course");
const{createSection, updateSection, deleteSection} = require("../controllers/Section")


router.post("/createCourse",auth,createCourse);
router.get("/getcoursedetails", getCourseDetails);
router.get("/showAllCourses", showAllCourses);
router.post("/createSection", createSection);
router.put("/updateSection", updateSection);
router.delete("/deleteSection", deleteSection);

module.exports = router 


