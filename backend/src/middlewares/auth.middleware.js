import { asyncHandler } from "./../utils/asyncHandler.js";
import { ApiError } from "./../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "./../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  // code to verify JWT
  // get access token from cookie
  // verify access token
  // if token is valid, set user in req object
  // if token is invalid, throw an error

  try {
    const accessToken =
      req.cookies?.accessToken || req.header("Authorization")?.split(" ")[1];

    if (!accessToken) {
      throw new ApiError(401, "Unauthorized Access");
    }

    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    req.user = user;

    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
});
