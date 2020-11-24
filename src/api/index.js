const Axios = require("axios").default;

const api = Axios.create({ baseURL: process.env.API, timeout: 10000 });

module.exports = api;
