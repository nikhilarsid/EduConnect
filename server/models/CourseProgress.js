const mongoose = require("mongoose")

const courseProgress = new mongoose.Schema({
    courseId:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref :"course"
    },

    completedVideos :[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "subsection"
        }
    ]
})

module.exports = mongoose.model("CourseProgress", courseProgress)