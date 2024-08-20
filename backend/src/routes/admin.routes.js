import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import {
  getAllExpenses,
  getAllUsers,
  updateUser,
  deleteUser,
  deleteExpense,
  editExpense,
} from "../controllers/admin.controller.js";

const router = Router();

router.route("/get-users").get(verifyJWT, verifyAdmin, getAllUsers);
router.route("/get-expenses").get(verifyJWT, verifyAdmin, getAllExpenses);
router.route("/update-user/:id").patch(verifyJWT, verifyAdmin, updateUser);
router.route("/delete-user/:id").delete(verifyJWT, verifyAdmin, deleteUser);
router
  .route("/delete-expense/:id")
  .delete(verifyJWT, verifyAdmin, deleteExpense);
router.route("/update-expense/:id").patch(verifyJWT, verifyAdmin, editExpense);

export default router;
