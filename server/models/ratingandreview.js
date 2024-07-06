const mongoose = require("mongoose")

const ratingsAndReviewsSchema = new mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    rating:{
        type : Number,
        required : true
    },
    review :{
        type : String,
        required : true,
        trim : true
    }
})

module.exports = mongoose.model("ratingandreview",ratingsAndReviewsSchema)