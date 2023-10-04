const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config({ path: './src/.env' })


const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});




// const mailOptions = {
//   from: 'sosmedapi4@gmail.com',
//   to: null,
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };



// function sendOTP(email){
//   mailOptions.to = email
//   transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// }); 
// }


module.exports = transporter