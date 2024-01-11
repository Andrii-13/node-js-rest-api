import multer from "multer";
import path from "path";

import { HttpError } from "../helpers/index.js";

// створюємо налаштування для middleware
const destination = path.resolve("temp");

const storage = multer.diskStorage({
  //шлях зберігання файлу
  destination,
  //перейменування файлу перед збереженням
  filename: (req, file, callback) => {
    const uniquePreffix = Date.now();
    console.log(uniquePreffix);
    const fileName = `${uniquePreffix}_${file.originalname}`;
    callback(null, fileName);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 3,
};

// зробимо фільтрацію по розширенню
const fileFilter = (req, file, callback) => {
    const extension = file.originalname.split(".").pop();
    if (extension === "exe") {
    callback(HttpError(400, "exe is not valid extetion"));
  }
  callback();
};

//обєднуємо налаштування в middleware яка зберігає в папці

const upload = multer({
    storage,
    limits,
    fileFilter,
})

export default upload;