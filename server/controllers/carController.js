import Car from "../models/Car.js";

// Controller actions for Car
const CarController = {
  createCar: async (req, res) => {
    try {
      const { brand, model, year, fuelType, mileage, userId } = req.body;

      const car = new Car({
        brand,
        model,
        year,
        fuelType,
        mileage,
        userId,
      });

      await car.save();

      res.status(201).json({ success: true, car });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getCar: async (req, res) => {
    try {
      const { carId } = req.params;

      const car = await Car.findById(carId);

      if (!car) {
        return res.status(404).json({ success: false, error: "Car not found" });
      }

      res.json({ success: true, car });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  updateCar: async (req, res) => {
    try {
      const { carId } = req.params;
      const { brand, model, year, fuelType, mileage } = req.body;

      const car = await Car.findByIdAndUpdate(
        carId,
        { brand, model, year, fuelType, mileage },
        { new: true }
      );

      if (!car) {
        return res.status(404).json({ success: false, error: "Car not found" });
      }

      res.json({ success: true, car });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  deleteCar: async (req, res) => {
    try {
      const { carId } = req.params;

      const car = await Car.findByIdAndDelete(carId);

      if (!car) {
        return res.status(404).json({ success: false, error: "Car not found" });
      }

      res.json({ success: true, message: "Car deleted" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
};

export default CarController;
