import Piece from "../models/Piece.js";
import Car from "../models/Car.js";

// Créer une nouvelle pièce
const createPiece = async (req, res) => {
  try {
    const { car: carId, date, mileage, replacements, notes, laborCost } = req.body;

    // Vérifier si la voiture existe
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Voiture introuvable" });
    }

    // Créer la nouvelle pièce
    const newPiece = await Piece.create({
      car: carId,
      date,
      mileage,
      replacements,
      notes,
      laborCost,
    });

    // Mettre à jour le kilométrage de la voiture
    if (car.mileage < mileage) {
      car.mileage = mileage;
      await car.save();
    }

    res.status(201).json(newPiece);
  } catch (error) {
    res.status(500).json({ message: "Une erreur est survenue lors de la création de la pièce" });
  }
};

// Obtenir toutes les pièces
const getAllPieces = async (req, res) => {
  try {
    const { userId } = req.params;
    const cars = await Car.find({ userId });
    const carIds = cars.map((car) => car._id);
    const pieces = await Piece.find({ car: { $in: carIds } });
    res.status(200).json(pieces);
  } catch (error) {
    res.status(500).json({ message: "Une erreur est survenue lors de la récupération des pièces" });
  }
};

// Obtenir une pièce par son ID
const getPieceById = async (req, res) => {
  try {
    const { id } = req.params;
    const piece = await Piece.findById(id);

    if (!piece) {
      return res.status(404).json({ message: "Pièce introuvable" });
    }

    res.status(200).json(piece);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Une erreur est survenue lors de la récupération de la pièce" });
  }
};

// Mettre à jour une pièce
const updatePiece = async (req, res) => {
  try {
    const { id } = req.params;
    const { carId, date, mileage, replacements, notes, laborCost } = req.body;

    const existingPiece = await Piece.findByIdAndUpdate(
      id,
      {
        car: carId,
        date,
        mileage,
        replacements,
        notes,
        laborCost,
      },
      { new: true }
    );

    if (!existingPiece) {
      return res.status(404).json({ message: "Pièce introuvable" });
    }

    res.status(200).json(existingPiece);
  } catch (error) {
    res.status(500).json({ message: "Une erreur est survenue lors de la mise à jour de la pièce" });
  }
};

// Supprimer une pièce
const deletePiece = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPiece = await Piece.findByIdAndRemove(id);

    if (!deletedPiece) {
      return res.status(404).json({ message: "Pièce introuvable" });
    }

    res.status(200).json({ message: "Pièce supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Une erreur est survenue lors de la suppression de la pièce" });
  }
};

// Obtenir les pièces d'un véhicule triées par date
const getPiecesByCar = async (req, res) => {
  try {
    const { carId } = req.params;

    const pieces = await Piece.find({ car: carId }).sort({ date: "desc" });

    res.status(200).json(pieces);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Une erreur est survenue lors de la récupération des pièces du véhicule" });
  }
};

// Calculer le coût total des pièces d'un véhicule
//
// Calculer le coût total des pièces pour une voiture spécifique
const getTotalCostByCar = async (req, res) => {
  try {
    const { carId } = req.params;

    const pieces = await Piece.find({ car: carId });

    let totalCost = 0;
    pieces.forEach((piece) => {
      piece.replacements.forEach((replacement) => {
        totalCost += replacement.cost;
      });
      totalCost += piece.laborCost;
    });

    res.status(200).json({ totalCost });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue lors du calcul du coût total des pièces pour la voiture",
    });
  }
};

export {
  createPiece,
  getAllPieces,
  getPieceById,
  updatePiece,
  deletePiece,
  getPiecesByCar,
  getTotalCostByCar,
};
