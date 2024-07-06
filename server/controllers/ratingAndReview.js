const Course = require("../models/Course");
const course = require("../models/Course");
const ratingandreview = require("../models/ratingandreview");
const ratingandReview = require("../models/ratingandreview");

exports.createRating = async(req, res) =>{
    try{
        const userId = req.user.body;
    const {rating, review, courseId} = req.body;
    //check if student enrolled
    const courseDetails = await course.findOne({_id:courseId,
                                                studentsEnrolled: {$eleMatch :{$eq : userId}},
    }
                                                
    );

    if(!courseDetails){
        return res.status(400).json({
            message: "student not enrolled in  the course",
            success: false,
        })
    }
    //check if user already given the review
    const alreadyReviewed = await ratingandReview.findOne({
                                                    user : userId,
                                                    course: courseId,
    })

    if(alreadyReviewed){
        return res.status(400).json({
            message: "already given a review",
            success: false,
        })
    };

    //create rating and review
    const ratingandreview = await ratingandReview.create({
                    rating, review, user: userId, course: courseId,
    });

    //update the course with the rating and review
    const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
                                    {
                                        $push: {
                                            ratingsAndReviews: ratingandReview
                                        }
                                    },{new : true},
    );
    console.log(updatedCourseDetails);

    //return response
    return res.status(200).json({
        message: "rating and review created successfullly",
        success: false,
    })
    }
    catch(error){
        return res.status(400).json({
            message: "internal server error in creating the review",
            success: false,
        })
    }



}

//get all rating and reviews
exports.getAllRatingAndReview = async (req, res) =>{
  try{
    const allrating = await ratingandReview.find({}).populate( 
                                                     {path: "user",
                                                      select: "firstName lastName email image"  
                                                     }          
    ).populate(
        {
            path: "course",
            select: "courseName"
        }
    ).exec();
    return res.status(200).json({
        message: "fetched all the ratings",
        success: true,
    })
  }
  catch(error){
    return res.status(400).json({
        message: "internal server error in fetching the ratings",
        success: false,
    })
  }
}

