import Express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import credentials from "./middlewares/credentials.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoute.js";
import carRoute from "./routes/carRoute.js";
import userRoute from "./routes/userRoute.js";
import fuelRoute from "./routes/fuelRoute.js";
import pieceRoute from "./routes/pieceRoute.js";
import reminderRoute from "./routes/reminderRoute.js";
import vidangeRoute from "./routes/vidangeRoute.js";
// Load environment variables
dotenv.config();

// Create Express app
const app = Express();

app.use(credentials);
//cross origin Ressource sharing
app.use(cors(corsOptions));
// Middleware de configuration CORS
// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "http://192.168.149.141:3000");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });
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
app.use("/api/car", carRoute);
app.use("/api/pieces", pieceRoute);
app.use("/api/vidanges", vidangeRoute);
app.use("/api/reminders", reminderRoute);
app.use("/api/fuel", fuelRoute);

// Default error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start server
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
