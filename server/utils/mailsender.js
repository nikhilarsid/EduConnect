const nodemailer = require("nodemailer")

const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT, 
            secure: process.env.MAIL_PORT == 465,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        let mailinfo = await transporter.sendMail({
            to: email,
            from: "royalking1627@gmail.com",
            subject: title,
            html: body
        });

        console.log(`Email sent: ${mailinfo.messageId}`);
    } catch (error) {
        console.log(`Error in sending mail: ${error}`);
    }
};

module.exports = mailSender