import express from "express";
import MaintenanceController from "../controllers/maintenanceController.js";

const router = express.Router();

// Routes for maintenance
router.post("/", MaintenanceController.createMaintenance);
router.get("/:maintenanceId", MaintenanceController.getMaintenance);
router.put("/:maintenanceId", MaintenanceController.updateMaintenance);
router.delete("/:maintenanceId", MaintenanceController.deleteMaintenance);

export default router;
