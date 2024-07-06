const mongoose =  require("mongoose")

const tagSchema = new mongoose.Schema({
    title : {
        type : String,
      
    },
    description:{
        type : String
    },

    courseId:{
        type : mongoose.Schema.Types.ObjectId,
        
        ref : "course"
    }
})


module.exports = mongoose.model("Tags", tagSchema)