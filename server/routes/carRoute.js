import express from "express";
import CarController from "../controllers/carController.js";

const router = express.Router();

// Routes for cars
router.post("/", CarController.createCar);
router.get("/:carId", CarController.getCar);
router.put("/:carId", CarController.updateCar);
router.delete("/:carId", CarController.deleteCar);

export default router;
