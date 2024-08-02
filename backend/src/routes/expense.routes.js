import { Router } from "express";
import { verifyJWT } from "./../middlewares/auth.middleware.js";
import {
  addExpense,
  deleteExpense,
  editExpense,
  getUserExpenses,
} from "./../controllers/expense.controller.js";

const router = Router();

router.route("/").post(verifyJWT, addExpense);

router.route("/:id").patch(verifyJWT, editExpense);

router.route("/:id").delete(verifyJWT, deleteExpense);

router.route("/").get(verifyJWT, getUserExpenses);

export default router;
