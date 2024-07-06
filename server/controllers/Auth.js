const User = require("../models/User");
const OTP = require("../models/OTP");
const otpgenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user already exists with the provided email
    const findEmail = await User.findOne({ email });
    if (findEmail) {
      return res.status(500).json({
        success: false,
        message: "User already exists",
      });
    }

    // Generate a new OTP
    let otpGenerated = otpgenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    console.log("OTP generated:", otpGenerated);

    // Ensure OTP is unique
    let result = await OTP.findOne({ otp: otpGenerated });
    console.log(result);
    while (result) {
      otpGenerated = otpgenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otpGenerated });
    }

    // Create OTP entry in the database
    const otpPayload = { email, otp: otpGenerated };
    const createOtpEntry = await OTP.create(otpPayload);

    console.log("OTP entry created:", createOtpEntry);

   

    // Return success response
    res.status(200).json({
      success: true,
      message: "OTP entry created successfully",
    });
  } catch (error) {
    console.error("Error in creating an OTP entry:", error);
    res.status(501).json({
      success: false,
      message: "Error in creating an OTP entry",
    });
  }
};

//SIGNUP
exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, password, confirmpassword, otp, email,accountType } =
      req.body;
    if (
      !firstName ||
      !lastName ||
      !password ||
      !confirmpassword ||
      !otp ||
      !email || !accountType
    ) {
      return res.status(501).json({
        success: true,
        message: "please fill all the details",
      });
    }

    const Email = await User.findOne({email : email});
    if(Email){
      return res.status(500).json({
        message: "user already registered",
        success: false,
      })
    }

    if (password !== confirmpassword) {
     return res.status(500).json({
        message: "passwords did not match",
        success: true,
      });
    }

    const recentotp = await OTP.find({ email })
      .sort({ createdAt: -1 }).limit(1)
      ;
    if (recentotp.length === 0) {
      return res.json({
        message: "otp not found",
        success: false,
      });
    }
    console.log(recentotp)

    if ( otp !== recentotp[0].otp.toString()) {
      return res.status(400).json({
        message: "please enter the correct otp",
        success: false,
      });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const profiledetails = await Profile.create({
      
      about: "",
      dateOfBirth:"",
      gender: "",
      phoneNumber:"" ,
    });

    const user = await User.create({
      firstName,
      lastName,
      password: hashedpassword,
      email,
      additionalDetails: profiledetails._id,
      accountType,
      img: `https://api.dicebar.com/5.x/initials/svg?seed= ${firstName} ${lastName}`,
    })

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "user not created please try again later",
      success: false,
      message:console.log(error)
    });
  }
};

//login

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
   // console.log("isMatch:", isMatch);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "password incorrect",
      });
    }

    // Create payload for JWT
    const payload = {
      email: user.email,
      id: user._id, 
      accountType: user.accountType,
    };

    // Sign JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "2h",
    });

    //console.log("Generated token:", token);

    
    user.token = token;
    user.password = undefined; 

    // Set cookie options
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      httpOnly: true, 
    };

    // Sending response with token in cookie
    return res.cookie("token", token, options).status(200).json({
      success: true,
      message: "logged in successfully",
      user,
      token,
    });

  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
  
