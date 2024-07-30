import { asyncHandler } from "./../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  // code to register a user
  res
    .status(201)
    .json({ success: true, message: "User registered successfully" });
});

export { registerUser };
