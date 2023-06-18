import express from "express";
import { verifyJWT } from "../middlewares/verifyJwt.js";
import { getUser, updateUser } from "../controllers/UserController.js";
const router = express.Router();

router.patch("/profile", [verifyJWT], updateUser);
router.get("/profile", [verifyJWT], getUser),
  //delete a user
  router.delete("/:userId");

export default router;
