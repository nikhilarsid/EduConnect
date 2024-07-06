const Course = require("../models/Course")

const Tag = require("../models/Tags")
const User = require("../models/User")
const {uploadImageToCloudinary} = require("../utils/imageUploader")

exports.createCourse = async(req, res) =>{
    try{
        //fetch data
    const {courseName, courseDescription, price, /*tags*/whatYouWillLearn} = req.body;

    //console.log(courseName)//

    //const thumbnail = req.files.thumbnailImage;
    //validate
    if(!courseName || !courseDescription || !price   || !whatYouWillLearn){
        return res.status(500).json({
            messsage:" please fill al the details",
            success : false,
        })
    }
    //console.log(req.body)
    //checking for the instructor
    const userId = req.body.id;
    //console.log(userId)
    const instructorDetails = await User.findById(userId);
    //console.log(instructorDetails)

    if(!instructorDetails){
        return res.status(500).json({
            message: "instructor details not found",
            success: false,
        })
    }

    //check for the tag
    /*const tagDetails= await Tag.findById(tag);
    if(!tagDetails){
        return res.status(500).json({
            message: "tag not found",
            success: false,
        })
    }*/

    //upload image
    //const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

    //create an entry for the new course
    console.log( instructorDetails._id)
    
        const newCourse = await Course.create({
            
            courseName:courseName,
            courseDescription:courseDescription,
            instructor:instructorDetails._id,
            whatYouWilllearn:whatYouWillLearn,
            price:price,
            //tags: tagDetails._id,
            //thumbnail: thumbnailImage.secure_url,
        })
    
        console.log(newCourse);
         res.status(200).json({
            message:"course added successfully",
        })
    
   

    //add the new course to the instructor user schema

    await User.findByIdAndUpdate(
        {_id : instructorDetails._id},
        {
            $push :{
                courses : newCourse._id,
            }
        },
        {new : true}
    )

    return res.status(200).json({
        message: "course created successfully",
        success: true,
        data: newCourse,
    })
    }
    catch{
        return res.status(500).json({
            message: "error while creating a course",
            success: false,
        })
    }

}

//get all courses handler function

exports.showAllCourses = async(req, res) =>{
    try{
        const allCourses = await Course.find({},{ courseName: true,
                                                 price: true,
                                                 //thumbnail: true,
                                                 instructor: true,
                                                 //studentsEnrolled: true,
                                                // ratingsAndReviews: true,
        }).populate("instructor").exec();

        return res.status(200).json({
            message: "all the courses fetched successfully",
            success: true,
            data: allCourses
        })
    }

    catch(error){
        return res.status(500).json=({
            message: "error in fetching all the courses ",
            success: false ,
            error,

        })
    }

}

//getting the course details
exports.getCourseDetails = async(req,res) =>{
    try{
        const {courseId} = req.body;

        const courseDetails = await Course.findOne({_id: courseId})
                                                  .populate(
                                                    {
                                                        path: "instructor",
                                                        populate :{
                                                            path : "additionalDetails"
                                                        },
                                                    }
                                                  )
                                                  //.populate("category")
                                                  //.populate("ratingAndReviews")
                                                  .populate({
                                                    path: "courseContent",
                                                    populate:{
                                                        path: "section",
                                                        populate:{
                                                            path: "subSection",
                                                        },
                                                    },
                                                  }).exec();
        
                            //validation
                            if(!courseDetails){
                                return res.status(400).json({
                                    message: "unable to find the course details ",
                                    success: false

                                })
                            }

                            return res.status(200).json({
                                message: "course details fetched successfully",
                                success: true,
                            })
    }
    catch(error){
        return res.status(400).json({
            message: "server error occured in fetching the details please try again",
            message : error.message,
        })
    }
}