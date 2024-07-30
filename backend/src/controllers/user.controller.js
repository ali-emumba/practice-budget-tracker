import { asyncHandler } from "./../utils/asyncHandler.js";
import { User } from "./../models/User.js";

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
});

User.findOne({
  email: validatedData.data.email,
}).then((user) => {
  if (user) {
    res.status(400);
    throw new Error("User with this email already exists");
  }
});

export { registerUser };
