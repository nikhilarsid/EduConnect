const mongoose  = require("mongoose")

const profileSchema = new mongoose.Schema({
    
    dateOfBirth : {
        type : String,
        
    },
    about:{
        type : String,
        
        trim : true
    },
    gender:{
        type : String,
        
    },
    phoneNumber :{
        type : String,
        
    }
})

module.exports = mongoose.model("Profile", profileSchema)