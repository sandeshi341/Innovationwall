const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();

// Enable CORS for requests from http://localhost:3000 (React)
const corsOptions = {
  origin: "http://localhost:3000", // Allow React app's origin
};

//app.use(cors(corsOptions));
app.use(
  "/fileuploads",
  express.static(path.join(__dirname,  "fileuploads"))
);

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "fileuploads")); // Upload files to 'fileuploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Append date to file name to avoid conflicts
  },
});

const upload = multer({ storage });

// Define a route to handle file fileuploads
app.post("/fileuploads", upload.single("file"), (req, res) => {
  const fileUrl = `http://localhost:3005/fileuploads/${req.file.filename}`;

  res.json({
    file: fileUrl,
  });
});

app.listen(3005, () => {
  console.log("Server is running on http://localhost:3005");
});
