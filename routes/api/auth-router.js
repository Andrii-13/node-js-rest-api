import express from "express";

import { isEmptyBody, isValidId} from "../../middlewares/index.js";

const authRouter = express.Router();

export default authRouter;