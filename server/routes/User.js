const express = require('express');
const router = express.Router();




const {
    login, signup, sendOtp
} = require("../controllers/Auth");
const {
    resetPassword, resetPasswordToken
} = require("../controllers/ResetPassword");

const{auth, isStudent,isAdmin,isInstructor} = require("../middlewares/auth")

//login route
router.post("/login", login);

//signup
router.post("/signup", signup);

//sending otp
router.post("/sendotp", sendOtp);

//reset password
router.post("/reset-password", resetPassword);

//reset password token
router.post("/reset-password-token", resetPasswordToken);

router.post("/student", auth, isStudent, (req, res) => {
    return res.status(200).json({
        message: "welcome to the student route",
        success: true,
    })
});

router.post("/admin", auth, isAdmin, (req,res)=>{
    return res.status(200).json({
        message: "welcome to the admin route",
        success: true
    })
});

router.post("/instructor", auth, isInstructor, (req,res)=>{
    return res.status(200).json({
        message: "welcome to the instructor route",
        success: true
    })
});

//export to the main application
module.exports = router 