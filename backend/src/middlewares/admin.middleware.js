import { asyncHandler } from "./../utils/asyncHandler.js";
import { ApiError } from "./../utils/ApiError.js";

const verifyAdmin = asyncHandler(async (req, res, next) => {
  // code to verify if user is admin
  // get user from req object
  // check if user is admin
  // if user is admin, call next
  // if user is not admin, throw an error

  console.log(
    "VERIFYING ADMIN AUTHORIZED MIDDLEWARE",
    " ------------------------------------------------"
  );

  const user = req.user;
  const isAdmin = await user.isAdmin();

  console.log("isAdmin", isAdmin);

  if (!isAdmin) {
    throw new ApiError(403, "Unauthorized Access, Admin Only");
  }

  next();
});

export { verifyAdmin };
