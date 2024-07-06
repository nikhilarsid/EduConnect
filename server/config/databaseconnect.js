const mongoose = require("mongoose");
require("dotenv").config();

function connectDb(){
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Server connected successfully"))
    .catch((error) => console.log("Error in connecting with database:", error));    
}

module.exports = connectDb;
