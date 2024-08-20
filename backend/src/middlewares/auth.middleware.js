import { asyncHandler } from "./../utils/asyncHandler.js";
import { ApiError } from "./../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "./../models/user.model.js";
import { generateAccessAndRefreshToken } from "../controllers/user.controller.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  // code to verify JWT
  // get access token from cookie
  // verify access token
  // if token is valid, set user in req object
  // if token is invalid, throw an error

  console.log(
    "VERIFYING JWT AUTHORIZED MIDDLEWARE",
    " ------------------------------------------------"
  );

  try {
    // console.log("cookie token", req.cookies?.accessToken);
    const accessToken =
      req.cookies?.accessToken || req.header("Authorization")?.split(" ")[1];

    console.log("accessToken", accessToken);
    if (!accessToken) {
      console.log("No Access Token");
      throw new ApiError(401, "Unauthorized Access");
    }

    // let jwtExpiredError = false;
    // let decodedToken = null;

    // jwt.verify(
    //   accessToken,
    //   process.env.ACCESS_TOKEN_SECRET,
    //   function (err, decoded) {
    //     if (err) {
    //       console.log(err.message, err.name);
    //       jwtExpiredError = err.name === "TokenExpiredError";
    //     } else {
    //       console.log("decoded", decoded);
    //       decodedToken = decoded;
    //     }
    //   }
    // );

    console.log("here");
    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    console.log("decodedToken", decodedToken);
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    // create new access and refreshtoken
    // set refreshtoken in backend
    // send access token in response

    // const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
    //   await generateAccessAndRefreshToken(user._id);

    // console.log("newAccessToken", newAccessToken, newRefreshToken);

    // res.locals.accessToken = newAccessToken;
    // res.locals.refreshToken = newRefreshToken;

    req.user = user;

    next();
  } catch (error) {
    console.log("error", error?.message, error?.name);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Access token expired. Please login again.",
      });
    }

    // General error handling for other JWT errors
    return res.status(401).json({
      success: false,
      message: error?.message || "Unauthorized Access",
    });
  }
});
