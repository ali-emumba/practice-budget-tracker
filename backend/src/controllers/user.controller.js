import { asyncHandler } from "./../utils/asyncHandler.js";
import { User } from "./../models/user.model.js";
import { ApiError } from "./../utils/ApiError.js";
import { uploadOnCLoudinary } from "./../utils/cloudinary.js";
import { ApiResponse } from "./../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // code to register a user
  // get user details from req.body
  // validate user details
  // check if user already exists
  // check for avatar image
  // upload avatar image to cloudinary
  // create a user object with the user details
  // save the user object to the database
  // check for user creation errors
  // remove password and refreah token from user object
  // return the user object

  const { email, firstname, lastname, password, budget } = req.body;
  const validatedData = userSignupSchema.safeParse({
    email,
    firstname,
    lastname,
    password,
    budget,
  });

  User.findOne({
    email: validatedData.data.email,
  }).then((user) => {
    if (user) {
      throw new ApiError(409, "User already exists");
    }
  });

  const avatarLocalPath = req.files?.avatar[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar image is required");
  }

  const avatar = await uploadOnCLoudinary(avatarLocalPath);

  if (!avatar) {
    throw new ApiError(500, "Avatar image upload failed");
  }

  const user = await User.create({
    email: validatedData.data.email,
    firstname: validatedData.data.firstname,
    lastname: validatedData.data.lastname,
    password: validatedData.data.password,
    budget: validatedData.data.budget,
    avatar: avatar.secure_url,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "User creation failed");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User Registered Successfully"));
});

export { registerUser };
