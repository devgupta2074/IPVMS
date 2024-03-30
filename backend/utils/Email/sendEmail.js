import nodemailer from "nodemailer";
import { template } from "./Template/reset.js";
export const sendEmail = async (email, token, location, device) => {
  if (!email || !token) {
    return;
  }
  try {
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,

      auth: {
        user: "914fb05c0e2850",
        pass: "e1265cffdcd11f",
      },
    });
    const htmlTemp = template(
      "http://localhost:3000/resetpassword/" + token,
      new Date().toLocaleDateString(),
      location,
      device
    );
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Password Reset",
      html: htmlTemp,
    });
  } catch (error) {
    console.log(error, "email not sent");
  }
};
