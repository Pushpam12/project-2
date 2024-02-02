const express = require("express")
const app = express();


app.use(express.json({limit: "10kb"}))
app.use(express.urlencoded({extended: true, limit : "10kb"}))
app.use(express.static("public"))


module.exports = app