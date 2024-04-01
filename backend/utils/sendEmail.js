import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({ path: "../.env" });
export const sendEmail = async (options) => {

    let transporter = nodemailer.createTransport({

        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD
        }
    });


    const mailOptions = {
        from: 'ADMIN admin@gmail.com',
        to: options.to,
        subject: options.subject,
        text: options.message
    };

    console.log(mailOptions);
    await transporter.sendMail(mailOptions);

};


// HOW TO USE


// import { sendEmail } from "./sendEmail.js";


// const mailoptions = {
//     from: 'ADMIN',
//     to: 'sandadi.rithvik@gmail.com',
//     subject: "Test Mail totoototot98765432t",
//     message: 'Test Mail'
// };
// await sendEmail(mailoptions);
