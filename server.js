const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(cors()); // Enable CORS

// Nodemailer transporter configuration for Outlook
const transporter = nodemailer.createTransport({
  host: "smtp.office365.com", // Use this for Outlook
  port: 587,
  secure: false, // true for 465
  auth: {
    user: "sandhrageorgebusiness@outlook.com", // Your Outlook email
    pass: "Password12345678910@", // Your Outlook app password
  },
});

// Test email sending when the server starts
transporter.sendMail(
  {
    from: "sandhrageorgebusiness@outlook.com",
    to: "sandhrageorgebusiness@outlook.com", // You can use another recipient if needed
    subject: "Test Email",
    text: "This is a test email to check SMTP configuration.",
  },
  (error, info) => {
    if (error) {
      console.error("Error sending test email:", error);
    } else {
      console.log("Test email sent:", info.response);
    }
  }
);

// Endpoint to handle form submissions
app.post("/send-email", (req, res) => {
  const { name, message } = req.body;

  console.log("Name:", name, "Message:", message); // Log incoming data

  const mailOptions = {
    from: "sandhrageorgebusiness@aol.com", // Replace with your AOL email
    to: "sandhrageorgebusiness@aol.com", // Replace with your destination email
    subject: "New Message from Contact Form",
    text: JSON.stringify({ name, message }, null, 2), // JSON formatted message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error); // Log the error
      return res.status(500).send({ error: error.toString() }); // Return error message
    }
    console.log("Email sent successfully:", info.response); // Log the success
    res.status(200).send("Email sent: " + info.response);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
