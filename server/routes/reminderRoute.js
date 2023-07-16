import express from "express";
import {
  createReminder,
  getAllReminders,
  getReminderById,
  updateReminder,
  deleteReminder,
  checkAllRemindersDue,
  getRemindersByCar,
} from "../controllers/reminderController.js";

const router = express.Router();

// Créer un rappel
router.post("/", createReminder);

// Récupérer tous les rappels
router.get("/:userId", getAllReminders);

// Récupérer un rappel par son ID
router.get("/reminder/:id", getReminderById);

// Mettre à jour un rappel
router.put("/:id", updateReminder);

// Supprimer un rappel
router.delete("/:id", deleteReminder);

// Vérifier si les rappels des voitures d'un utilisateur sont dus
router.post("/check-due", checkAllRemindersDue);

// Récupérer tous les rappels associés à un véhicule spécifique
router.get("/car/:carId", getRemindersByCar);

export default router;
