import express from "express";
import {
  createReminder,
  getReminderById,
  updateReminder,
  deleteReminder,
  getRemindersByCar,
  completeReminder,
  getRemindersByStatus,
  sortRemindersByDate,
  sortRemindersByMileage,
} from "../controllers/reminderController.js";

const router = express.Router();

// Créer un rappel
router.post("/", createReminder);

// Récupérer un rappel par ID
router.get("/:id", getReminderById);

// Mettre à jour un rappel
router.put("/:id", updateReminder);

// Supprimer un rappel
router.delete("/:id", deleteReminder);

// Récupérer tous les rappels associés à un véhicule spécifique
router.get("/car/:carId", getRemindersByCar);

// Marquer un rappel comme complet
router.put("/:id/complete", completeReminder);

// Récupérer les rappels par statut (complet ou non complet)
router.get("/status/:completed", getRemindersByStatus);

// Trier les rappels par date (ordre croissant ou décroissant)
router.get("/sort/date/:ascending", sortRemindersByDate);

// Trier les rappels par kilométrage (ordre croissant ou décroissant)
router.get("/sort/mileage/:ascending", sortRemindersByMileage);

export default router;
