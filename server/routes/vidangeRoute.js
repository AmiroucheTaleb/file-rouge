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

// Obtenir toutes les vidanges d'un utilisateur
router.get("/user", getAllVidanges);

// Obtenir une vidange par son ID
router.get("/:id", getVidangeById);

// Mettre à jour une vidange
router.put("/:id", updateVidange);

// Supprimer une vidange
router.delete("/:id", deleteVidange);

// Obtenir les vidanges d'un véhicule
router.get("/car/:carId", getVidangesByCar);

// Calculer le coût total des vidanges d'un véhicule
router.get("/car/:carId/total-cost", calculateTotalVidangeCost);

// Obtenir la dernière vidange d'un véhicule
router.get("/car/:carId/last-vidange", getLastVidangeByCar);

export default router;
