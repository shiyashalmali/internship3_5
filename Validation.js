const isValid = function (value){
    if (typeof value === "undefined" || value=== null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    if (typeof value === Number && value.trim().length === 0) return false;
    return true;
};

let isValidBody = function(body){
    return Object.keys(body).length >0;
};

let isValidName=/^[a-zA-Z]*$/;
let isValidEmail = /^\S+@\S+$/;

 
module.exports ={isValid , isValidBody, isValidName, isValidEmail }