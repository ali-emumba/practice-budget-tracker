import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import {
  getAllExpenses,
  getAllUsers,
  updateUser,
} from "../controllers/admin.controller.js";

const router = Router();

router.route("/get-users").get(verifyJWT, verifyAdmin, getAllUsers);
router.route("/get-expenses").get(verifyJWT, verifyAdmin, getAllExpenses);
router.route("/update-user/:id").patch(verifyJWT, verifyAdmin, updateUser);

export default router;
