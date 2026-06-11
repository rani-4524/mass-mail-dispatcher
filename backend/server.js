require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/send-mail", async (req, res) => {
  try {
    const { emails, subject, message } = req.body;

    if (!emails || emails.length === 0) {
      return res.json({ success: false, message: "Emails are required!" });
    }
    if (!subject) {
      return res.json({ success: false, message: "Subject is required!" });
    }
    if (!message) {
      return res.json({ success: false, message: "Message is required!" });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    for (let email of emails) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: message,
      });
    }

    return res.json({
      success: true,
      message: "✅ All mails sent successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "❌ Mail sending failed!" });
  }
});

app.get("/", (req, res) => {
  res.send("✅ Backend is running successfully!");
});
app.get("/api/send-mail", (req, res) => {
  res.send("✅ This route works only with POST request");
});
app.listen(5000, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
