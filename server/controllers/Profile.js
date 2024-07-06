const User = require("../models/User");
const Profile = require("../models/Profile");
const Course = require("../models/Course");

exports.updateProfile = async(req, res) =>{
    try{
        const{dateOfBirth="", about="", phoneNumber, gender} = req.body;
        console.log(dateOfBirth)
        const id = req.body.id;
    
    //find profile
    const userdetails = await User.findById({_id: id});
    const profileid = userdetails.additionalDetails;
    const profiledetails = await Profile.findById(profileid);

    //updateprofile
    profiledetails.dateOfBirth = dateOfBirth;
    profiledetails.about = about;
    profiledetails.phoneNumber = phoneNumber;
    profiledetails.gender = gender;
    profiledetails.save();

    //return response
    res.status(200).json({
        message: "profile deatils updated successfully",
        success : true,
    })
    }
    catch(error){
            return res.status(500).json({
                message: "error in updating the profile details",
                success: false,
                error: error.message,
            })
    }



}

//delete profile

exports.deleteProfile = async (req, res) => {
    try{
        //getid
    const id = req.body.id;
    //validate
    const user = await User.findById(id)
    if(!user){
        return res.status(500).json({
            message: "invalid user id",
            success: false
        })
    }
    const idd  = user.additionalDetails;
    console.log(idd)
    
    await Profile.findByIdAndDelete(user.additionalDetails);
    // Delete associated courses
    const deleteCoursePromises = user.courses.map(async (courseId) => {
        await Course.findByIdAndDelete(courseId);
    });
   // user.courses.forEach(async (courseId) => {
    //    await Course.findByIdAndDelete(courseId);
   // });

    // Wait for all courses to be deleted
    await Promise.all(deleteCoursePromises);
    await User.findByIdAndDelete(id);

    return res.status(200).json({
        message: "user deleted successfully",
        success: true
    })
    }
    catch(error){
            return res.status(500).json({
                message: "error while deleting an user , please try again",
                success: false
            })
    }
   
}