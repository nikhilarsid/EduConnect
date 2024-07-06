const express = require('express');
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
//const paymentRoutes = require("./routes/Payment");
const courseRoutes = require("./routes/Course");
const sectionRoutes = require("./routes/Section")
const connectDb = require("./config/databaseconnect");
const cookieParser = require("cookie-parser");
const cors = require("cors");
//const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

// Database connection
connectDb();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:3000", 'http://localhost:3001'], // Allowing requests from React frontend running on these ports
  credentials: true,
}));
app.use(fileUpload());

// Routes


app.use("/api/user", userRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/section" , sectionRoutes);
app.use("/api/profile", profileRoutes);

// Error handler middleware
//app.use(require("./middlewares/errorhandler"));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

