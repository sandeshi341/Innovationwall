const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();

// Enable CORS for requests from http://localhost:3000 (React)
const corsOptions = {
  origin: "http://localhost:3000", // Allow React app's origin
};

app.use(cors(corsOptions));

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Upload files to 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Append date to file name to avoid conflicts
  },
});

const upload = multer({ storage });

// Define a route to handle file uploads
app.post("/upload", upload.single("file"), (req, res) => {
  const fileUrl = `http://localhost:3005/uploads/${req.file.filename}`;
  res.json({
    file: req.file.originalname,
  });
});

app.listen(3005, () => {
  console.log("Server is running on http://localhost:3005");
});
