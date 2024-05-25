// sendMail.js
const nodemailer = require("nodemailer");

module.exports = async function sendMail(name, email, phone, need, message) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER, 
      pass: process.env.PASS,   
    },
  });

  const mailOptions = {
    from: "JK Associates",   
    to: "jkassociatesbd@gmail.com", 
    subject: "Request for Service (From Website)",
    html: `
      <h2 style="text-align:center; color: #0B5345;">Client Details:</h2>
      <table style="width:60%; border-collapse: collapse; margin: 0 auto; background-color: #EBEDEF ;">
        <tr>
          <td style="padding: 10px; border: 1px solid #dddddd; font-weight: bold; color: #0B5345;">Name of the client:</td>
          <td style="padding: 10px; border: 1px solid #dddddd; font-weight: bold; color: #0B5345;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #dddddd; font-weight: bold; color: #0B5345;">Email:</td>
          <td style="padding: 10px; border: 1px solid #dddddd; font-weight: bold; color: #0B5345;">${email}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #dddddd; font-weight: bold; color: #0B5345;">Contact No:</td>
          <td style="padding: 10px; border: 1px solid #dddddd; font-weight: bold; color: #0B5345;">${phone}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #dddddd; font-weight: bold; color: #0B5345;">Requested Service:</td>
          <td style="padding: 10px; border: 1px solid #dddddd; font-weight: bold; color: #0B5345;">${need}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #dddddd; font-weight: bold; color: #0B5345;">Message:</td>
          <td style="padding: 10px; border: 1px solid #dddddd; font-weight: bold; color: #0B5345;">${message}</td>
        </tr>
      </table>
    `,
  };
  
  

  try {
    const result = await transporter.sendMail(mailOptions);
    return {
      success: true,
      message: "Email sent successfully",
    };
  } catch (error) {
    console.error("Something went wrong while sending mail:", error);
    return {
      success: false,
      message: "Mail was not sent",
      error: error.message,
    };
  }
};
