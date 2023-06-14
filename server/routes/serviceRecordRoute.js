import express from "express";
import ServiceRecordController from "../controllers/ServiceRecordController.js";

const router = express.Router();

// Routes for service records
router.post("/", ServiceRecordController.createServiceRecord);
router.get("/:serviceRecordId", ServiceRecordController.getServiceRecord);
router.put("/:serviceRecordId", ServiceRecordController.updateServiceRecord);
router.delete("/:serviceRecordId", ServiceRecordController.deleteServiceRecord);

export default router;
