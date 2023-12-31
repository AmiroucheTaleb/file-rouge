import Vidange from "../models/Vidange.js";
import Car from "../models/Car.js";

// Créer une nouvelle vidange
const createVidange = async (req, res) => {
  try {
    const { car: carId, date, mileage, oilType, notes, cost } = req.body;
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Véhicule introuvable" });
    }

    const newVidange = await Vidange.create({
      car: carId,
      date,
      mileage,
      oilType,
      notes,
      cost,
    });

    // Mettre à jour le kilométrage de la voiture
    if (car.mileage < mileage) {
      car.mileage = mileage;
      await car.save();
    }

    res.status(201).json(newVidange);
  } catch (error) {
    res.status(500).json({ message: "Une erreur est survenue lors de la création de la vidange" });
  }
};

// Obtenir toutes les vidanges d'un utilisateur
const getAllVidanges = async (req, res) => {
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

    const vidanges = await Vidange.find({ car: { $in: carIds } }).populate("car");
    res.status(200).json(vidanges);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Une erreur est survenue lors de la récupération des vidanges" });
  }
};

// Obtenir une vidange par son ID
const getVidangeById = async (req, res) => {
  try {
    const { id } = req.params;
    const vidange = await Vidange.findById(id);

    if (!vidange) {
      return res.status(404).json({ message: "Vidange introuvable" });
    }

    res.status(200).json(vidange);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Une erreur est survenue lors de la récupération de la vidange" });
  }
};

// Mettre à jour une vidange
const updateVidange = async (req, res) => {
  try {
    const { id } = req.params;
    const { car, date, mileage, oilType, notes, cost } = req.body;

    const existingVidange = await Vidange.findByIdAndUpdate(
      id,
      {
        car,
        date,
        mileage,
        oilType,
        notes,
        cost,
      },
      { new: true }
    );

    if (!existingVidange) {
      return res.status(404).json({ message: "Vidange introuvable" });
    }

    res.status(200).json(existingVidange);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Une erreur est survenue lors de la mise à jour de la vidange" });
  }
};

// Supprimer une vidange
const deleteVidange = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedVidange = await Vidange.findByIdAndRemove(id);

    if (!deletedVidange) {
      return res.status(404).json({ message: "Vidange introuvable" });
    }

    res.status(200).json({ message: "Vidange supprimée avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Une erreur est survenue lors de la suppression de la vidange" });
  }
};

const getVidangesByCar = async (req, res) => {
  try {
    const { carId } = req.params;
    const vidanges = await Vidange.find({ car: carId }).sort({ date: 1 });
    res.status(200).json(vidanges);
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue lors de la récupération des vidanges du véhicule",
    });
  }
};
//fonction a supprimée
const calculateTotalVidangeCost = async (req, res) => {
  try {
    const { carId } = req.params;
    const vidanges = await Vidange.find({ car: carId });
    let totalCost = 0;
    vidanges.forEach((vidange) => {
      totalCost += vidange.cost;
    });
    res.status(200).json({ totalCost });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue lors du calcul du coût total des vidanges du véhicule",
    });
  }
};

const getLastVidangeByCar = async (req, res) => {
  try {
    const { carId } = req.params;
    const vidange = await Vidange.findOne({ car: carId }).sort({ date: -1 });
    res.status(200).json(vidange);
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue lors de la récupération de la dernière vidange du véhicule",
    });
  }
};

export {
  createVidange,
  getAllVidanges,
  getVidangeById,
  updateVidange,
  deleteVidange,
  getVidangesByCar,
  calculateTotalVidangeCost,
  getLastVidangeByCar,
};
