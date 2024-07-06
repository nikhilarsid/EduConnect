const User = require("../models/User");
require("dotenv").config();
const jwt = require("jsonwebtoken")

exports.auth = async (req, res, next) =>{
    try{
        const token = req.body.token 
                    ||  req.cookies.token
                    || req.header("Authorization").replace("bearer", "")
        
        if(!token){
            return res.status(403).json({
                success : false,
                message : 'token is missing'
            })
        }

        //verify the token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = decode;
            console.log(decode);

        }
        catch(error){
                return res.status(403).json({
                    success : false,
                    message : 'token is invalid',
                    error
                })
        }
        next();
    }

    catch{
        return res.status(403).json({
            success : false,
            message : 'please try again something went wrong while validating the token',

        })
    }
}

//isStudent

exports.isStudent = async(req, res, next) => {
    try{
        if(req.user.accountType !=="student"){
            return res.status(401).json({
                success : false,
                message : 'this is protected route for students'

            })
        }
        next();
    }
    catch(error){
        return res.status(402).json({
            success : false,
            message : 'something went wrong while authenticating the student role'
        })
    }
}

//IsInstructor

exports.isInstructor = async(req, res, next) => {
    try{
        if(req.user.accountType !=="instructor"){
            return res.status(401).json({
                success : false,
                message : 'this is protected route for instructor'

            })
        }
        next();
    }
    catch(error){
        return res.status(402).json({
            success : false,
            message : 'something went wrong while authenticating the instructor role'
        })
    }
}


//admin

exports.isAdmin = async(req, res, next) => {
    try{
        if(req.user.accountType !=="admin"){
            return res.status(401).json({
                success : false,
                message : 'this is protected route for admin'

            })
        }
        console.log(req.user.accountType);
        next();
    }
    catch(error){
        return res.status(402).json({
            success : false,
            message : 'something went wrong while authenticating the admin role',
            
        })
    }
}
