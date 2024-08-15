import { asyncHandler } from "./../utils/asyncHandler.js";
import { ApiError } from "./../utils/ApiError.js";
import { ApiResponse } from "./../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Expense } from "../models/expenses.model.js";
import { Notification } from "../models/notifications.model.js";

const getAllUsers = asyncHandler(async (req, res) => {
  // code to get all users
  // get all users from database
  // return all users

  console.log(
    "GET ALL USERS",
    " ------------------------------------------------"
  );

  const users = await User.find({});
  if (!users) {
    throw new ApiError(404, "No users found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, users, "Users retrieved successfully"));
});

const getAllExpenses = asyncHandler(async (req, res) => {
  // code to get all expenses
  // get all expenses from database
  // return all expenses

  console.log(
    "GET ALL EXPENSES",
    " ------------------------------------------------"
  );

  // Fetch all expenses and populate the user's first and last name
  const expenses = await Expense.find({}).populate(
    "user",
    "firstname lastname"
  );

  if (!expenses || expenses.length === 0) {
    throw new ApiError(404, "No expenses found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, expenses, "Expenses retrieved successfully"));
});

const updateUser = asyncHandler(async (req, res) => {
  // code to update a user
  // get user id from req object
  // get updated user details from req object
  // update user details
  // return success message

  console.log(
    "UPDATING USER",
    " ------------------------------------------------"
  );

  const admin = req.user;

  const { id } = req.params;
  const { firstname, lastname, budget } = req.body;

  if (!firstname || !lastname || !budget) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        firstname,
        lastname,
        budget,
      },
    },
    { new: true }
  ).select("-password -refreshToken");
  if (!user) {
    throw new ApiError(404, "User updated unsuccessfull");
  }

  const notification = new Notification({
    title: user.email,
    message: "Updated Successfully",
    user: admin._id,
  });
  const savedNotification = await notification.save();
  console.log("savedNotification", savedNotification);

  if (!savedNotification) {
    throw new ApiError(500, "Failed to add notification");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User updated successfully"));
});

const deleteUser = asyncHandler(async (req, res) => {
  // code to delete a user
  // get user id from req object
  // delete user
  // return success message

  console.log(
    "DELETING USER",
    " ------------------------------------------------"
  );

  const admin = req.user;

  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "User ID is required");
  }

  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  console.log("User deleted", user);

  const notification = new Notification({
    title: user.email,
    message: "Deleted Successfully",
    user: admin._id,
  });
  const savedNotification = await notification.save();
  console.log(savedNotification);

  if (!savedNotification) {
    throw new ApiError(500, "Failed to add notification");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "User deleted successfully"));
});

export { getAllUsers, getAllExpenses, updateUser, deleteUser };
