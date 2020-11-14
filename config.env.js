const isDevelopment = () => process.env.NODE_ENV == "development";
const dotenv = require("dotenv");
const envFilePath = isDevelopment() == true ? ".env" : ".env-prod";
const config = dotenv.config({ path: envFilePath });



const { API } = process.env;
module.exports = { API };
