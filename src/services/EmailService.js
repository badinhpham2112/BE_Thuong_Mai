const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config()

const SendEmailCreateOrder = async() => {
    const transporter = nodemailer.createTransport({
        host: "smtp.forwardemail.net",
        port: 587,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"BanHang 👻" <phamdinhba09112002@gmail.com>', // sender address
            to: "phamdinhba09112002@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });
    }

}

module.exports = {
    SendEmailCreateOrder

}