import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoute.js";
import CarRoute from "./routes/carRoute.js";
import serviceRecordRoute from "./routes/serviceRecordRoute.js";
import maintenanceRoute from "./routes/maintenanceRoute.js";
import repairRoute from "./routes/repairRoute.js";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());

// Connect to database
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/car", CarRoute);
app.use("/api/serviceRecordRoute", serviceRecordRoute);
app.use("/api/maintenance", maintenanceRoute);
app.use("/api/repair", repairRoute);

// Default error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
