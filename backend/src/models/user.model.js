import mongoose, { Schema } from "mongoose";
import bcyrpt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: [true, "Firstname is required"],
      trim: true,
      lowercase: true,
    },
    lastname: {
      type: String,
      required: [true, "Lastname is required"],
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    avatar: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      default: 0,
      required: [true, "Budget is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcyrpt.hash(this.password, 10);
  }
  next();
});
userSchema.methods.isPasswordMatch = async function (enteredPassword) {
  return await bcyrpt.compare(enteredPassword, this.password);
};
userSchema.methods.generateAccessToken = function () {
  return jwt.sign({ id: this._id, email: this.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRATION,
  });
};

export const User = mongoose.model("User", userSchema);
