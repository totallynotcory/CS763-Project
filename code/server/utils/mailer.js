const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "trialsize@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendResetEmail(formattedToken, email, link) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'trialsize@gmail.com',
    to: email, 
    subject: "You one-time password", 
    html: `
      <h1>Hi there!</h1>
      <br/><br/>
      <div>Trying to reset your password?</div>
      <a href="http://${link}">Click here</a>
      <div>And provide us with this token:</div>
      <h2>${formattedToken}</h2>
    `,
  });

  return info;
}

module.exports = sendResetEmail;