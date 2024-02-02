const express = require("express")
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors')

app.use(cookieParser());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({limit: "10kb"}))
app.use(express.urlencoded({extended: true, limit : "10kb"}))
app.use(express.static("public"))


module.exports = app ;