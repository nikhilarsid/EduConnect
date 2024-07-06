const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type : String,
        required : true
    },
    lastName :{
        type : String,
        required: true
    },
    password:{
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    img : {
        type : String,
        required : true
    },
    courses :[{
        type : mongoose.Schema.Types.ObjectId,
    
        ref : "Course"
    }
    ],
    
    additionalDetails :{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Profile"
    },

    token : {
        type : String
    },
    expiresIn:{
        type : Date,
    },
    courseProgress : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "courseProgress"
    },
    accountType :{
        type : String,
        enum : ["student","instructor", "admin"],
        required : true
    }



})

module.exports = mongoose.model("User", userSchema)