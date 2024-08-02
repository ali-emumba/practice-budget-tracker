import { Expense } from "./../models/expenses.model.js";
import { asyncHandler } from "./../utils/asyncHandler.js";
import { ApiError } from "./../utils/ApiError.js";
import { ApiResponse } from "./../utils/ApiResponse.js";
import { expenseEntrySchema } from "./../schemas/expenseEntry.validation.js";

const addExpense = asyncHandler(async (req, res) => {
  {
    //  code to add an expense
    // get user id from req.user
    // get title price category date from req.body
    // create a new expense
    // save the expense
    // return the expense

    console.log(
      "ADDING AN EXPENSE",
      " ------------------------------------------------"
    );
  }

  const { title, price, category, date } = req.body;
  const validatedData = expenseEntrySchema.safeParse({
    title,
    price,
    category,
    date,
  });
  console.log(validatedData.error?.message);
  if (!validatedData.success) {
    throw new ApiError(400, validatedData.error.message);
  }

  const user = req.user;
  if (!user) {
    throw new ApiError(401, "Unauthorized Access");
  }

  const expense = new Expense({ title, price, category, date, user: user._id });
  const savedExpense = await expense.save();

  if (!savedExpense) {
    throw new ApiError(500, "Failed to add expense");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, savedExpense, "Expense added successfully"));
});

const editExpense = asyncHandler(async (req, res) => {
  // code to edit an expense
  // get id from req.params
  // get title price category date from req.body
  // find the expense by id
  // update the expense
  // return the updated expense

  console.log(
    "EDITING AN EXPENSE",
    " ------------------------------------------------"
  );

  const { id } = req.params;
  const { title, price, category, date } = req.body;

  if (!title || !price || !category || !date) {
    throw new ApiError(400, "All fields are required");
  }

  if (!id) {
    throw new ApiError(400, "Expense ID is required");
  }

  const validatedData = expenseEntrySchema.safeParse({
    title,
    price,
    category,
    date,
  });
  console.log(validatedData.error?.message);
  if (!validatedData.success) {
    throw new ApiError(400, validatedData.error.message);
  }

  const expense = await Expense.findByIdAndUpdate(
    id,
    {
      title,
      price,
      category,
      date,
    },
    { new: true }
  );

  if (!expense) {
    throw new ApiError(404, "Expense creation unsuccessful");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, expense, "Expense updated successfully"));
});

const deleteExpense = asyncHandler(async (req, res) => {
  // code to delete an expense
  // get id from req.params
  // find the expense by id
  // delete the expense
  // return success message

  console.log(
    "DELETING AN EXPENSE",
    " ------------------------------------------------"
  );

  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, "Expense ID is required");
  }

  const expense = await Expense.findById(id);
  if (!expense) {
    throw new ApiError(404, "Expense not found");
  }

  const deletedEntry = await Expense.deleteOne(expense);
  if (!deletedEntry) {
    throw new ApiError(500, "Failed to delete expense");
  }
  console.log(deletedEntry);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Expense deleted successfully"));
});

const getUserExpenses = asyncHandler(async (req, res) => {
  // code to get a user's expenses
  // get user id from req.user
  // find all expenses with user id
  // return the expenses

  console.log(
    "GETTING USER EXPENSES",
    " ------------------------------------------------"
  );

  const user = req.user;
  if (!user) {
    throw new ApiError(401, "Unauthorized Access");
  }

  const expenses = await Expense.find({ user: user._id });
  if (!expenses) {
    throw new ApiError(404, "No expenses found");
  }

  console.log(expenses);

  return res
    .status(200)
    .json(new ApiResponse(200, expenses, "Expenses fetched successfully"));
});

export { addExpense, editExpense, deleteExpense, getUserExpenses };
