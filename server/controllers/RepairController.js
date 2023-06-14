import Repair from "../models/Repair.js";

// Controller actions for Repair
const RepairController = {
  createRepair: async (req, res) => {
    try {
      const { serviceRecordId, category, subcategory, description, photo } = req.body;

      const repair = new Repair({
        serviceRecord: serviceRecordId,
        category,
        subcategory,
        description,
        photo,
      });

      await repair.save();

      res.status(201).json({ success: true, repair });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  getRepair: async (req, res) => {
    try {
      const { repairId } = req.params;

      const repair = await Repair.findById(repairId);

      if (!repair) {
        return res.status(404).json({ success: false, error: "Repair not found" });
      }

      res.json({ success: true, repair });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  updateRepair: async (req, res) => {
    try {
      const { repairId } = req.params;
      const { category, subcategory, description, photo } = req.body;

      const repair = await Repair.findByIdAndUpdate(
        repairId,
        { category, subcategory, description, photo },
        { new: true }
      );

      if (!repair) {
        return res.status(404).json({ success: false, error: "Repair not found" });
      }

      res.json({ success: true, repair });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  deleteRepair: async (req, res) => {
    try {
      const { repairId } = req.params;

      const repair = await Repair.findByIdAndDelete(repairId);

      if (!repair) {
        return res.status(404).json({ success: false, error: "Repair not found" });
      }

      res.json({ success: true, message: "Repair deleted" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
};

export default RepairController;
