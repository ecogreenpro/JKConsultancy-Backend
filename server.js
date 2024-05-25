// server.js
const express = require("express");
const cors = require("cors");
const sendMail = require("./sendMail");

require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/send-mail", async (req, res) => {
  try {
    const result = await sendMail(
      req.body.name,
      req.body.email,
      req.body.phone,
      req.body.need,
      req.body.message
    );

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: "Email was not sent",
      });
    }

    res.status(200).json({
      success: true,
      message: "Email sent successfully",
      result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err?.message,
    });
  }
});

app.listen(port, () => {
  console.log("Server listening on port", port);
});
