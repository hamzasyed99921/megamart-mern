const dotenv = require('dotenv').config();

const PORT = process.env.PORT;
const URI = process.env.URI;
const BACKEND_SERVER_PATH = process.env.BACKEND_SERVER_PATH
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET

module.exports = { 
    PORT,
    URI,
    BACKEND_SERVER_PATH,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET
}