import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import {
  getAllExpenses,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/admin.controller.js";

const router = Router();

router.route("/get-users").get(verifyJWT, verifyAdmin, getAllUsers);
router.route("/get-expenses").get(verifyJWT, verifyAdmin, getAllExpenses);
router.route("/update-user/:id").patch(verifyJWT, verifyAdmin, updateUser);
router.route("/delete-user/:id").delete(verifyJWT, verifyAdmin, deleteUser);

export default router;
