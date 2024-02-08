import nodemailer from "nodemailer";

// Convert EMAIL_PORT to a number. If it's not set or invalid, default to 465
const port = process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT, 10) : 465;

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: port,
    secure: port === 465, // true if port is 465, false otherwise
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


export const sendEmail=async(email:string,name:string, token:string)=>{
    const info = await transporter.sendMail({
        from: "jayed.freelance@gmail.com", // sender address
        to: email, // list of receivers
        subject: "Forgot-Password", // Subject line
        html:`
            <div>
                <p>Hey ${name} , Your forget password link is below</p>
                <a href="http//:loaclhost:3000/update-password/${token}" >click here</a>
            </div>
        `, // html body
      });

      return info;
}