import express from "express";
import CarController from "../controllers/carController.js";
import { verifyJWT } from "../middlewares/verifyJwt.js";

const router = express.Router();

// Routes for cars
router.post("/", verifyJWT, CarController.createCar);
router.get("/", verifyJWT, CarController.getAllCars);
router.get("/:carId", verifyJWT, CarController.getCar);
router.put("/:carId", verifyJWT, CarController.updateCar);
router.delete("/:carId", verifyJWT, CarController.deleteCar);

export default router;
