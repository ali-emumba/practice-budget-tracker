import { z } from "zod";

const expenseEntrySchema = z.object({
  title: z
    .string()
    .max(30, { message: "Title cannot exceed 30 characters" })
    .regex(/^[a-zA-Z\s-]+$/, {
      message: "Title can only contain alphabets, spaces, and hyphens",
    })
    .nonempty({ message: "Title is required" }),

  price: z
    .string() // Assuming price is coming as a string
    .regex(/^\d+$/, { message: "Price can only contain numbers" })
    .max(30, { message: "Price cannot exceed 30 characters" })
    .nonempty({ message: "Price is required" }),

  date: z
    .string()
    .regex(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, {
      message: "Date must be in DD/MM/YYYY format",
    })
    .nonempty({ message: "Date is required" }),
});

export { expenseEntrySchema };
