
var CryptoJS = require("crypto-js");

export const Encrypt = (userid,password) =>{
    console.log(password);
    var utf8arr = CryptoJS.enc.Utf8.parse(password);
    var hash = CryptoJS.SHA256(utf8arr);
    console.log(hash);
    return CryptoJS.enc.Base64.stringify(hash);
}