export const handleSaveError = (error, data, next) => {
  const { name, code } = error;
  error.status = (name === "MongoServerError" && code === 11000) ? 409 : 400;
  next();
};

//{new: true} щоб повертав оновлений обєкт, runValidators: true - щоб робив перевірку по схемі при апдейті
export const addUpdateSettings = function (next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
};
