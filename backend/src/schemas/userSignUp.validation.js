import { z } from "zod";

const userSignupSchema = z.object({
  firstName: z
    .string()
    .max(50, { message: "First Name cannot exceed 50 characters" })
    .regex(/^[a-zA-Z\s-]+$/, {
      message: "First Name can only contain alphabets, spaces, and hyphens",
    })
    .nonempty({ message: "First Name is required" }),

  lastName: z
    .string()
    .max(50, { message: "Last Name cannot exceed 50 characters" })
    .regex(/^[a-zA-Z\s-]+$/, {
      message: "Last Name can only contain alphabets, spaces, and hyphens",
    })
    .nonempty({ message: "Last Name is required" }),

  email: z
    .string()
    .email({ message: "Invalid email format" })
    .nonempty({ message: "Email is required" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[@$!%*?&]/, {
      message: "Password must contain at least one special character",
    })
    .nonempty({ message: "Password is required" }),

  budget: z
    .number({ invalid_type_error: "Budget must be a number" })
    .int({ message: "Budget must be an integer" })
    .min(1, { message: "Budget must be at least 1" })
    .max(99999999, { message: "Budget cannot exceed 99999999" }),
});

export { userSignupSchema };
