const User = require("../models/User")
require("dotenv").config();
const mailSender = require("../utils/mailsender")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

exports.resetPasswordToken = async( req, res) =>{
    try{
           //get email from body
    const email = req.body.email;
    //validate
    const user = await User.findOne({email});
    if(!user){
        return res.status(403).json({
            success : false,
            message : 'user email not found in database'
        })
    }
    //create token
    const token = crypto.randomUUID();
    console.log(token);

    const updatedDetails  = await User.findOneAndUpdate({email : email},
                                        {
                                            token : token,
                                            expiresIn : Date.now()+5*60*1000,
                                        }, {new: true}
    )

    // create url
    const url = `http:\\localhost:3000/update-password/${token}`

    //send email
    await mailSender(email, 
                    "password reset link",
                    `Link : ${url}`
    )

    return res.status(200).json({
        success : true,
        message : 'email sent successfully please reset your password'
    })
}

    
    catch{
        return res.status(401).json({
            success : false,
            message : 'error in sending reset password link'
        })

    }
}


//reset password
exports.resetPassword = async(req, res)=>{
    try{
        const{password, confirmpassword, token} = req.body;

    //validate password
    if(password!== confirmpassword){
        return res.status(400).json({
            message: "passwords not matching",
            success: false,
        })
    }

    //find user by token
    const userDeatils =await User.findOne({token: token})

    //check user exists or not
    if(!userDeatils){
        return res.status(401).json({
            success: false,
            message: 'token invalid',
        })
    }

    if(userDeatils.expiresIn < Date.now()){
        return res.status(500).json({
            message: 'token expired please regenrate again',
            success: false,
        })
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password,10);

    //update password
    await User.findOneAndUpdate(
       {token : token},
        {password: hashedPassword},
        {new: true}
    )

    return res.status(200).json({
        message: "password updated successfully",
        success: true,
    })
    }

    catch{
        return res.status(500).json({
            message: "error occured in changing the password please try again",
            success: false,

        })
    }


}