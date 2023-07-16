import express from "express";
import {
  createPiece,
  getAllPieces,
  getPieceById,
  updatePiece,
  deletePiece,
  getPiecesByCar,
  getTotalCostByCar,
} from "../controllers/pieceController.js";

const router = express.Router();

// Route pour créer une nouvelle pièce
router.post("/", createPiece);

// Route pour obtenir toutes les pièces
router.get("/user/:userId", getAllPieces);

// Route pour obtenir une pièce par son ID
router.get("/:id", getPieceById);

// Route pour mettre à jour une pièce
router.put("/:id", updatePiece);

// Route pour supprimer une pièce
router.delete("/:id", deletePiece);

// Route pour obtenir les pièces d'un véhicule triées par date
router.get("/car/:carId", getPiecesByCar);

// Route pour calculer le coût total des pièces d'un véhicule
router.get("/car/:carId/totalCost", getTotalCostByCar);

export default router;
