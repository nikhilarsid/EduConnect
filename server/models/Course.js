const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    courseName : {
        type : String,
        required : true
    },
    courseDescription :{
        type : String,
        required : true
    },
    price :{
        type : String,
        required : true
    },
    studentsEnrolled :[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }],
    courseContent:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "section"
    }],
    tags :{
        type : mongoose.Schema.Types.ObjectId,
        
        ref : "tags"
    },
    ratingsAndReviews:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "ratingandreview"
   }],
   instructor:{
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
   },
   whatYouWilllearn: {
    type : String,
    
   },
   thumbnail : {
    type : String,
    
   }
    

    
})

module.exports = mongoose.model("Course", courseSchema)