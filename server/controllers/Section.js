const Section = require("../models/Section");
const Course = require("../models/Course");
const Profile = require("../models/Profile");
const { default: mongoose } = require("mongoose");

exports.createSection = async(req, res) =>{
   try{
         //fetch data
    const{sectionName, courseId} = req.body;

    console.log(sectionName);

    //validate data
    if(!sectionName || !courseId){
        return res.status(500).json({
            messsage: "please fill all the details correctly",
            success: false,

        })
    }
    console.log(typeof(courseId));
    


    //create new section
    const newSection = await Section.create({sectionName});

    //add newly created section to the course schema
    const updatedCourse = await Course.findByIdAndUpdate(
        new mongoose.Types.ObjectId(courseId), // Directly passing the ObjectId
        {
            $push: {
                courseContent: newSection._id
            }
        },
        { new: true }
    );

    return res.status(200).json({
        message: "section created successfully",
        success: true,
        updatedCourse
    })

   }
   catch(error){
        return res.status(500).json({
            message: "unable to create an section please try again",
            success: false,
            error,
        })
   }

}

//updating a section
exports.updateSection = async(req, res) => {
   try{
         //fetch the data to change the section name
     const {sectionName, sectionId} = req.body;
     //validate
      if(!sectionName || !sectionId){
         return res.status(500).json({
             messsage: "please fill all the details ",
             success: false,
 
         })
     }
 
     //update data
     const section = await Section.findByIdAndUpdate(new mongoose.Types.ObjectId(sectionId), {sectionName}, {new:true});
 
     //return response
 
     return res.status(200).json({
         message: "section updated successfully",
         success: true,
         section
     })
   }
   catch(error){
    return res.status(500).json({
        message: "erron in updating a section , please try again",
        success: false,
        error: error.message,
    })
}

}

//delete section

exports.deleteSection = async(req, res) =>{
   try{
         //getid --> sending through params
    const sectionId = req.query.sectionId;
    console.log(sectionId);
    //delete
    await Section.findByIdAndDelete(sectionId);
    //return response
    return res.status(200).json({
        message: "section deleted successfully",
        success: true,
    })
   }
   catch(error){
    return res.status(500).json({
        message: "erron in deleting a section , please try again",
        success: false,
        error: error
    })
}
}
