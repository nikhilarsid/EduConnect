const mongoose = require("mongoose")
const mailSender = require("../utils/mailsender")

const otpSchema = mongoose.Schema({
    otp : {
        type : Number,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    createdAt:{
        type : Date,
        default : Date.now(),
        expires : 5*60*1000
    }

})


//function to send the mails

const sendverificationmail = async (email, otp) => {
    try {
        let mailinfo = await mailSender(email, "Verification Code", `Your OTP is: ${otp}`);
        console.log("OTP sent successfully");
    } catch (error) {
        console.log(`Error in sending the OTP: ${error}`);
    }
};

otpSchema.pre("save", async function(next){
    await sendverificationmail(this.email, this.otp);
    next();
})


module.exports = mongoose.model("OTP", otpSchema)


//otpSchema.pre("save", async function (next) {
 //   await mailSender(this.email, "Verification Code", `Your OTP is: ${this.otp}`);
 //   next();
//});