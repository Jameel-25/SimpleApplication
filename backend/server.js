const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, "../frontend")));

// MongoDB connection (replace with your connection string)
mongoose
  .connect("mongodb://localhost:27017/yourdbname", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API endpoint for contact form submission
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  console.log(
    `Received contact form submission: Name: ${name}, Email: ${email}, Message: ${message}`
  );
  res.json({ status: "success", message: "Form submitted successfully!" });
});

// API endpoint to fetch some data
app.get("/api/data", (req, res) => {
  const sampleData = [
    { id: 1, name: "Feature 1", description: "Description of feature 1" },
    { id: 2, name: "Feature 2", description: "Description of feature 2" },
  ];
  res.json(sampleData);
});

// Serve the index.html file when accessing the root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
