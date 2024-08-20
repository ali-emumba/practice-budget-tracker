import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: `${process.env.CORS_ORIGIN}`,
    credentials: true,
  })
);

app.use(cookieParser());

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

// routes
import userRouter from "./routes/user.routes.js";
import expenseRouter from "./routes/expense.routes.js";
import adminRouter from "./routes/admin.routes.js";
import notificationRouter from "./routes/notification.route.js";
import { injectDataToResponse } from "./middlewares/injectMiddlewareToResponse.js";

// app.use(injectDataToResponse);

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/expenses", expenseRouter);
app.use("/api/v1/notifications", notificationRouter);
app.use("/api/v1/admin", adminRouter);

export { app };
