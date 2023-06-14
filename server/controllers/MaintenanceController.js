import Maintenance from "../models/Maintenance.js";

// Controller actions for Maintenance
const MaintenanceController = {
  createMaintenance: async (req, res) => {
    try {
      const { serviceRecordId, category, subcategory, brand, photo } = req.body;

      const maintenance = new Maintenance({
        serviceRecord: serviceRecordId,
        category,
        subcategory,
        brand,
        photo,
      });

      await maintenance.save();

      res.status(201).json({ success: true, maintenance });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getMaintenance: async (req, res) => {
    try {
      const { maintenanceId } = req.params;

      const maintenance = await Maintenance.findById(maintenanceId);

      if (!maintenance) {
        return res.status(404).json({ success: false, error: "Maintenance not found" });
      }

      res.json({ success: true, maintenance });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  updateMaintenance: async (req, res) => {
    try {
      const { maintenanceId } = req.params;
      const { category, subcategory, brand, photo } = req.body;

      const maintenance = await Maintenance.findByIdAndUpdate(
        maintenanceId,
        { category, subcategory, brand, photo },
        { new: true }
      );

      if (!maintenance) {
        return res.status(404).json({ success: false, error: "Maintenance not found" });
      }

      res.json({ success: true, maintenance });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  deleteMaintenance: async (req, res) => {
    try {
      const { maintenanceId } = req.params;

      const maintenance = await Maintenance.findByIdAndDelete(maintenanceId);

      if (!maintenance) {
        return res.status(404).json({ success: false, error: "Maintenance not found" });
      }

      res.json({ success: true, message: "Maintenance deleted" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
};

export default MaintenanceController;
