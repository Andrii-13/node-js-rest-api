export const handleSaveError = (error, data, next)=> {
    error.status = 400;
    next();
}

 //{new: true} щоб повертав оновлений обєкт, runValidators: true - щоб робив перевірку по схемі при апдейті
export const addUpdateSettings = function(next){
    this.options.new = true;
    this.options.runValidators = true;
    next();
}