import User from "../models/User.js";
import { HttpError } from "../helpers/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const {JWT_SECRET} = process.env;
const { DB_HOST, PORT} = process.env;

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashPassword });

    res.json({
      user: {
        email: newUser.email,
        password: newUser.password,
      },
    });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
    }
   
    const {_id: id} = user;
    const payload = {
        id
    };
    const token =jwt.sign(payload, JWT_SECRET, {expiresIn: "23h"});

    res.json({
        token,
    })
  } catch (error) {
    next(error);
  }
};

export default {
  signup,
  signin,
};
