import express from "express";
import { getUser, updateUser } from "../controllers/UserController.js";
const router = express.Router();

router.patch("/profile", updateUser);
router.get("/profile", getUser),
  //delete a user
  router.delete("/:userId");

export default router;
