import Fuel from "../models/Fuel.js";
import Car from "../models/Car.js";

// Créer une nouvelle dépense de carburant
export const createFuelExpense = async (req, res) => {
  try {
    const { carId, date, mileage, fuelExpense } = req.body;

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Véhicule introuvable" });
    }

    const newFuelExpense = await Fuel.create({
      car: carId,
      date,
      mileage,
      fuelExpense,
    });

    car.mileage = mileage;
    await car.save();

    res.status(201).json(newFuelExpense);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Une erreur est survenue lors de la création de la dépense de carburant" });
  }
};

// Récupérer toutes les dépenses de carburant
export const getFuelExpenses = async (req, res) => {
  try {
    const fuelExpenses = await Fuel.find();
    res.status(200).json(fuelExpenses);
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue lors de la récupération des dépenses de carburant",
    });
  }
};

// Récupérer une dépense de carburant par son ID
export const getFuelExpenseById = async (req, res) => {
  try {
    const fuelExpenseId = req.params.id;
    const fuelExpense = await Fuel.findById(fuelExpenseId);

    if (!fuelExpense) {
      return res.status(404).json({ message: "Dépense de carburant introuvable" });
    }

    res.status(200).json(fuelExpense);
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue lors de la récupération de la dépense de carburant",
    });
  }
};

// Mettre à jour une dépense de carburant
export const updateFuelExpense = async (req, res) => {
  try {
    const fuelExpenseId = req.params.id;
    const { date, mileage, fuelExpense } = req.body;

    const fuelExpenseToUpdate = await Fuel.findByIdAndUpdate(
      fuelExpenseId,
      { date, mileage, fuelExpense },
      { new: true }
    );

    if (!fuelExpenseToUpdate) {
      return res.status(404).json({ message: "Dépense de carburant introuvable" });
    }

    res.status(200).json(fuelExpenseToUpdate);
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue lors de la mise à jour de la dépense de carburant",
    });
  }
};

// Supprimer une dépense de carburant
export const deleteFuelExpense = async (req, res) => {
  try {
    const fuelExpenseId = req.params.id;

    const fuelExpenseToDelete = await Fuel.findByIdAndRemove(fuelExpenseId);

    if (!fuelExpenseToDelete) {
      return res.status(404).json({ message: "Dépense de carburant introuvable" });
    }

    res.status(200).json({ message: "Dépense de carburant supprimée avec succès" });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue lors de la suppression de la dépense de carburant",
    });
  }
};
// Récupérer toutes les dépenses de carburant associées à un véhicule spécifique
export const getFuelExpensesByCar = async (req, res) => {
  try {
    const { carId } = req.params;

    const fuelExpenses = await Fuel.find({ car: carId });

    res.json(fuelExpenses);
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la récupération des dépenses de carburant.",
    });
  }
};
