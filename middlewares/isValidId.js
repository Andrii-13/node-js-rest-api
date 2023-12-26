import { isValidObjectId } from "mongoose";
import { HttpError } from "../helpers/index.js";

//перевіряє чи id чи ні
const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if(!isValidObjectId(contactId)){
    return next(HttpError(404, `Not found`))
  }
  next();
};

export default isValidId;