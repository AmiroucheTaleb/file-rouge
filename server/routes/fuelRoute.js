import express from "express";
import {
  createFuelExpense,
  getFuelExpenseById,
  updateFuelExpense,
  deleteFuelExpense,
  getFuelExpensesByCar,
  getAllFuelExpenses,
  calculateTotalFuelCost,
} from "../controllers/fuelController.js";

const router = express.Router();

// Créer une dépense de carburant
router.post("/", createFuelExpense);

// récupérer toute les depenses de carburant d'un utilisateur
router.get("/user", getAllFuelExpenses);

// Récupérer une dépense de carburant par ID
router.get("/:id", getFuelExpenseById);

// Mettre à jour une dépense de carburant
router.put("/:id", updateFuelExpense);

// Supprimer une dépense de carburant
router.delete("/:id", deleteFuelExpense);

// Récupérer toutes les dépenses de carburant associées à un véhicule spécifique
router.get("/car/:carId", getFuelExpensesByCar);

// calcule du cout total des depenses de carburant associées à un véhicule spécifique
router.get("/car/:carId/total-cost", calculateTotalFuelCost);

export default router;
