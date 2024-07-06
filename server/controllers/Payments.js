const User = require("../models/User");
const mailSender = require("../utils/mailsender");
const verificationEmail = require("../email/templates/courseEnrollmentEmail");
const {instance} = require("../config/razorpay");
const Course = require("../models/Course");

//capture the payment

exports.capturePayment = async(req, res) =>{
    //get details of the coursea nd the buyer
    const courseId = req.body;
    const userId = req.user.id;
    //validation
    if(!courseId){
        return res.status(500).json({
            message: "please provide a valid course id",
            success: false,
        })
    }
    //check if the user is already enrollled in the course
    let course;
    try{
         course = Course.findById(courseId)
         if(!course){
            return res.status(500).json({
                message: "course not found",
                success: false,
            })
         }

         const uid = new mongoose.Types.ObjectId(userId);
         if(course.studentsEnrolled.includes(uid)){
            return res.json({
                success: false,
                message: "user already exists in the course",
            })
         }
    }
    catch(error){
        return res.status(500).json({
            message: error.message,
            success: false,
        })

    }

    //order create
    const amount = course.price;
    const currency = "INR";

    const options = {
        amount: amount*100,
        currency: currency,
        reciept :Math.random(Date.now()).toString(),
        notes :{
            courseId, userId
        }
    }

    try{
        const paymentResponse = await instance.orders.create(options);
        console,log(paymentResponse);
        return res.status(200).json({
            success: true,
            messsage: "order created successfully",
            courseId : courseId,
            description : course.description,
            name: course.name,
            orderId : paymentResponse.id,

        })
    }
    catch{
        return res.status(500).json({
            message: " error in creating an order, please try again",
            success: false,
        })
    }

}

//verify the signature of razorpay and the server

exports.verifySignature = async(req, res) =>{
    const webHooksecret = "12345678";

    const signature = req.headers["x-razorpay-signature"];
    const serverSecret = crypto.createHmac("server", webHooksecret);
    serverSecret.update(JSON.stringify(req.body));
    const digest = serverSecret.digest("hex");

    if(signature === digest){
        console.log("payment is authorised");
    }

    const {course_id, user_id} = req.body.payload.payment.entity.notes;

    try{
        //find the courseand enroll the student
        const enrolledCourse = await Course.findOneAndDelete({course_id},
                                                            {
                                                                studentsEnrolled: user_id,
                                                            },
                                                            {new: true},
        )

        if(!enrolledCourse){
            return res.status(500).json({
                message: "error in finding an enrolled course",
                success: false,
            })
        }

        //update the course i.e, add the student to the student enrolled section
        const enrolledcourse = await Course.findOneAndUpdate({course_id},
                                                            {$push :{
                                                                studentsEnrolled: user_id
                                                            },}, {new: true}
        )

        //in the user schema add the enrolled course to the list of enrolled courses

        const enrolledStudent = await User.findOneAndUpdate({user_id},
                                                             {$push:{
                                                                courses: course_id,
                                                             }}, {new : true}
        )

        console.log(enrolledCourse);

        //send email
        const mailRespionse = await mailSender(enrolledStudent.email,"congratulations", "happy learning");

        console.log(mailRespionse);
        return res.status(200).json({
            message: "enrolled in a course successfully",
            success: true,
        })

    }
    catch(error){
        return res.status(500).json({
            message: error.message,
            success: false,
        })
    }

    

}