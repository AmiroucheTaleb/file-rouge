import express from "express";
import RepairController from "../controllers/RepairController.js";

const router = express.Router();

// Routes for repairs
router.post("/", RepairController.createRepair);
router.get("/:repairId", RepairController.getRepair);
router.put("/:repairId", RepairController.updateRepair);
router.delete("/:repairId", RepairController.deleteRepair);

export default router;
