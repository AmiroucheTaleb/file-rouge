import ServiceRecord from "../models/serviceRecord.js";

// Controller actions for ServiceRecord
const ServiceRecordController = {
  createServiceRecord: async (req, res) => {
    try {
      const { carId, mileage, date, totalCost, type } = req.body;

      const serviceRecord = new ServiceRecord({
        car: carId,
        mileage,
        date,
        totalCost,
        type,
      });

      await serviceRecord.save();

      res.status(201).json({ success: true, serviceRecord });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getServiceRecord: async (req, res) => {
    try {
      const { serviceRecordId } = req.params;

      const serviceRecord = await ServiceRecord.findById(serviceRecordId);

      if (!serviceRecord) {
        return res.status(404).json({ success: false, error: "Service record not found" });
      }

      res.json({ success: true, serviceRecord });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  updateServiceRecord: async (req, res) => {
    try {
      const { serviceRecordId } = req.params;
      const { mileage, date, totalCost, type } = req.body;

      const serviceRecord = await ServiceRecord.findByIdAndUpdate(
        serviceRecordId,
        { mileage, date, totalCost, type },
        { new: true }
      );

      if (!serviceRecord) {
        return res.status(404).json({ success: false, error: "Service record not found" });
      }

      res.json({ success: true, serviceRecord });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  deleteServiceRecord: async (req, res) => {
    try {
      const { serviceRecordId } = req.params;

      const serviceRecord = await ServiceRecord.findByIdAndDelete(serviceRecordId);

      if (!serviceRecord) {
        return res.status(404).json({ success: false, error: "Service record not found" });
      }

      res.json({ success: true, message: "Service record deleted" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
};

export default ServiceRecordController;
