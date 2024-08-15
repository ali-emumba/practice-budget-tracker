import { asyncHandler } from "./../utils/asyncHandler.js";
import { ApiError } from "./../utils/ApiError.js";
import { ApiResponse } from "./../utils/ApiResponse.js";
import { expenseEntrySchema } from "./../schemas/expenseEntry.validation.js";
import { Notification } from "./../models/notifications.model.js";
import e from "express";

const getUserNotifications = asyncHandler(async (req, res) => {
  // code to get user notifications
  // get user from req object
  // get all notifications for the user
  // return all notifications

  console.log(
    "GET USER NOTIFICATIONS",
    " ------------------------------------------------"
  );

  const user = req.user;
  if (!user) {
    throw new ApiError(401, "Unauthorized Access");
  }

  console.log("user", user, user._id);
  const notifications = await Notification.find({ user: user._id });
  if (!notifications) {
    throw new ApiError(404, "No notifications found");
  }

  console.log("notifications", notifications);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        notifications,
        "Notifications retrieved successfully"
      )
    );
});

export { getUserNotifications };
