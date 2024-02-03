const express = require("express")
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(cookieParser());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.static("public"));
app.use(express.urlencoded({extended: true, limit: "20kb"}))
app.use(express.json({limit: "16kb"}))


// Route import
const userRouter  = require("./routes/user.routes.js")

// Route declaration
app.use("/api/v1/user", userRouter)

app.use((err, req, res, next)=>{
    console.log(err.message);
    res.send(err)
})


module.exports = app ;