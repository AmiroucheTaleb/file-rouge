import Reminder from "../models/Reminder.js";
import Car from "../models/Car.js";

// Créer un rappel
export const createReminder = async (req, res) => {
  try {
    const { carId, title, description, dueDate, mileageThreshold } = req.body;

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Véhicule introuvable" });
    }

    const newReminder = await Reminder.create({
      car: carId,
      title,
      description,
      dueDate,
      mileageThreshold,
    });

    res.status(201).json(newReminder);
  } catch (error) {
    res.status(500).json({ message: "Une erreur est survenue lors de la création du rappel" });
  }
};

// Récupérer tous les rappels
export const getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find();
    res.status(200).json(reminders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Une erreur est survenue lors de la récupération des rappels" });
  }
};

// Récupérer un rappel par son ID
export const getReminderById = async (req, res) => {
  try {
    const reminderId = req.params.id;
    const reminder = await Reminder.findById(reminderId);

    if (!reminder) {
      return res.status(404).json({ message: "Rappel introuvable" });
    }

    res.status(200).json(reminder);
  } catch (error) {
    res.status(500).json({ message: "Une erreur est survenue lors de la récupération du rappel" });
  }
};

// Mettre à jour un rappel
export const updateReminder = async (req, res) => {
  try {
    const reminderId = req.params.id;
    const { title, description, dueDate, mileageThreshold, completed } = req.body;

    const updatedReminder = await Reminder.findByIdAndUpdate(
      reminderId,
      { title, description, dueDate, mileageThreshold, completed },
      { new: true }
    );

    if (!updatedReminder) {
      return res.status(404).json({ message: "Rappel introuvable" });
    }

    res.status(200).json(updatedReminder);
  } catch (error) {
    res.status(500).json({ message: "Une erreur est survenue lors de la mise à jour du rappel" });
  }
};

// Supprimer un rappel
export const deleteReminder = async (req, res) => {
  try {
    const reminderId = req.params.id;

    const deletedReminder = await Reminder.findByIdAndRemove(reminderId);

    if (!deletedReminder) {
      return res.status(404).json({ message: "Rappel introuvable" });
    }

    res.status(200).json({ message: "Rappel supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Une erreur est survenue lors de la suppression du rappel" });
  }
};

// Vérifier si un rappel est dû
export const checkReminderDue = async (currentDate, currentMileage) => {
  try {
    const reminders = await Reminder.find();

    const dueReminders = reminders.filter((reminder) => {
      return (
        (reminder.dueDate && reminder.dueDate <= currentDate) ||
        (reminder.mileageThreshold && reminder.mileageThreshold <= currentMileage)
      );
    });

    return dueReminders;
  } catch (error) {
    throw new Error("Une erreur est survenue lors de la vérification des rappels");
  }
};

// Récupérer tous les rappels associés à un véhicule spécifique
export const getRemindersByCar = async (carId) => {
  try {
    const reminders = await Reminder.find({ car: carId });
    return reminders;
  } catch (error) {
    throw new Error(
      "Une erreur s'est produite lors de la récupération des rappels associés au véhicule."
    );
  }
};

// Marquer un rappel comme complet
export const completeReminder = async (reminderId) => {
  try {
    const reminder = await Reminder.findByIdAndUpdate(
      reminderId,
      { completed: true },
      { new: true }
    );
    return reminder;
  } catch (error) {
    throw new Error("Une erreur s'est produite lors du marquage du rappel comme complet.");
  }
};

// Filtrer les rappels par statut (complet ou non complet)
export const getRemindersByStatus = async (completed) => {
  try {
    const reminders = await Reminder.find({ completed });
    return reminders;
  } catch (error) {
    throw new Error(
      "Une erreur s'est produite lors de la récupération des rappels en fonction du statut."
    );
  }
};

// Tri des rappels par date (ordre croissant ou décroissant)
export const sortRemindersByDate = async (ascending = true) => {
  try {
    const sortDirection = ascending ? 1 : -1;
    const reminders = await Reminder.find().sort({ dueDate: sortDirection });
    return reminders;
  } catch (error) {
    throw new Error("Une erreur s'est produite lors du tri des rappels par date.");
  }
};

// Tri des rappels par kilométrage (ordre croissant ou décroissant)
export const sortRemindersByMileage = async (ascending = true) => {
  try {
    const sortDirection = ascending ? 1 : -1;
    const reminders = await Reminder.find().sort({ mileageThreshold: sortDirection });
    return reminders;
  } catch (error) {
    throw new Error("Une erreur s'est produite lors du tri des rappels par kilométrage.");
  }
};
