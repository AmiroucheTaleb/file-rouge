import Fuel from "../models/Fuel.js";
import Car from "../models/Car.js";

// Créer une nouvelle dépense de carburant
export const createFuelExpense = async (req, res) => {
  try {
    const { car: carId, date, mileage, cost } = req.body;

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Véhicule introuvable" });
    }

    const newFuelExpense = await Fuel.create({
      car: carId,
      date,
      mileage,
      cost,
    });

    // Mettre à jour le kilométrage de la voiture
    if (car.mileage < mileage) {
      car.mileage = mileage;
      await car.save();
    }

    res.status(201).json(newFuelExpense);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Une erreur est survenue lors de la création de la dépense de carburant" });
  }
};
// Obtenir toutes les pièces
export const getAllFuelExpenses = async (req, res) => {
  try {
    const filter = {};
    req.query.userCar !== "" && (filter.car = req.query.userCar);

    let carIds;
    if (req.query.userCar === "") {
      const userId = req.user;
      const cars = await Car.find({ userId });
      carIds = cars.map((car) => car._id);
    } else {
      carIds = [req.query.userCar];
    }
    // const carIds = cars.map((car) => car._id);

    const fuelExpenses = await Fuel.find({ car: { $in: carIds } }).populate("car");
    res.status(200).json(fuelExpenses);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        message: "Une erreur est survenue lors de la récupération des depense de carburant",
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
    const { date, mileage, cost } = req.body;

    const fuelExpenseToUpdate = await Fuel.findByIdAndUpdate(
      fuelExpenseId,
      { date, mileage, cost },
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

export const calculateTotalFuelCost = async (req, res) => {
  try {
    const { carId } = req.params;
    const fuelExpenses = await Fuel.find({ car: carId });
    let totalCost = 0;
    fuelExpenses.forEach((fuel) => {
      totalCost += fuel.cost;
    });
    res.status(200).json({ totalCost });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue lors du calcul du coût total des vidanges du véhicule",
    });
  }
};
