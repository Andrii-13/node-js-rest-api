import express from "express";

import authController from "../../controllers/auth-controller.js";
import { isEmptyBody, isValidId} from "../../middlewares/index.js";
import { userSigninSchema, userSignupSchema } from "../../models/User.js";

const authRouter = express.Router();

authRouter.post("/register", isEmptyBody, authController.signup);

authRouter.post('/login', isEmptyBody, authController.signin)

export default authRouter;