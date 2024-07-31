import mongoose, { Schema } from "mongoose";

const expenseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// Instance method to update an entry
expenseSchema.methods.updateEntry = async function (updateData) {
  Object.assign(this, updateData);
  return this.save();
};

// Instance method to delete an entry
expenseSchema.methods.deleteEntry = async function () {
  return this.remove();
};

export const Expense = mongoose.model("Expense", expenseSchema);
