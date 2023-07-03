import express from "express";
import {
  createVidange,
  getAllVidanges,
  getVidangeById,
  updateVidange,
  deleteVidange,
  getVidangesByCar,
  calculateTotalVidangeCost,
  getLastVidangeByCar,
} from "../controllers/vidangeController.js";

const router = express.Router();

// Créer une nouvelle vidange
router.post("/", createVidange);

// Obtenir toutes les vidanges
router.get("/", getAllVidanges);

// Obtenir une vidange par son ID
router.get("/:id", getVidangeById);

// Mettre à jour une vidange
router.put("/:id", updateVidange);

// Supprimer une vidange
router.delete("/:id", deleteVidange);

// Obtenir les vidanges par véhicule et trier par date
router.get("/car/:carId", getVidangesByCar);

// Calculer le coût total des vidanges par véhicule
router.get("/car/:carId/total-cost", calculateTotalVidangeCost);

// Obtenir la dernière vidange d'un véhicule
router.get("/car/:carId/last-vidange", getLastVidangeByCar);

export default router;
