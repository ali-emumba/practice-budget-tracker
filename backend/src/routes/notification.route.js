import { Router } from "express";
import { verifyJWT } from "./../middlewares/auth.middleware.js";

import { getUserNotifications } from "./../controllers/notification.controller.js";

const router = Router();

router.route("/").get(verifyJWT, getUserNotifications);

export default router;
