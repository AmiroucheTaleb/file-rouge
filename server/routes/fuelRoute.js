import express from "express";
import {
  createFuelExpense,
  getFuelExpenseById,
  updateFuelExpense,
  deleteFuelExpense,
  getFuelExpensesByCar,
  sortFuelExpensesByDate,
  sortFuelExpensesByMileage,
} from "../controllers/fuelController.js";

const router = express.Router();

// Créer une dépense de carburant
router.post("/", createFuelExpense);

// Récupérer une dépense de carburant par ID
router.get("/:id", getFuelExpenseById);

// Mettre à jour une dépense de carburant
router.put("/:id", updateFuelExpense);

// Supprimer une dépense de carburant
router.delete("/:id", deleteFuelExpense);

// Récupérer toutes les dépenses de carburant associées à un véhicule spécifique
router.get("/car/:carId", getFuelExpensesByCar);

// Trier les dépenses de carburant par date (ordre croissant ou décroissant)
router.get("/sort/date/:ascending", sortFuelExpensesByDate);

// Trier les dépenses de carburant par kilométrage (ordre croissant ou décroissant)
router.get("/sort/mileage/:ascending", sortFuelExpensesByMileage);

export default router;
