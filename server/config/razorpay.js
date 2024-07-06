const Razorpay = require("razorpay")

exports.instance = Razorpay.instance({
    key_id : process.env.RAZORPAY_KEY,
    key_secret : process.env.RAZORPAY_SECRET,
})