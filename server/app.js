import Express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import credentials from "./middlewares/credentials.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoute.js";
import CarRoute from "./routes/carRoute.js";
import serviceRecordRoute from "./routes/serviceRecordRoute.js";
import maintenanceRoute from "./routes/maintenanceRoute.js";
import repairRoute from "./routes/repairRoute.js";
import userRoute from "./routes/userRoute.js";

// Load environment variables
dotenv.config();

// Create Express app
const app = Express();

app.use(credentials);
//cross origin Ressource sharing
app.use(cors(corsOptions));
//built in middleware for to handle urlencoded form data
app.use(Express.urlencoded({ extended: true }));
//built in middleware for json
app.use(Express.json());

//middleware for cookies
app.use(cookieParser());

// Connect to database
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, () => console.log(`Server started on port ${PORT}`)))
  .catch((err) => console.log(err));

// Routes
app.use("/api/users", userRoute);
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
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
