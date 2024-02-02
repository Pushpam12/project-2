require("dotenv").config()
const app = require("./app.js")
let { PORT } = require("./constants.js")
const  connectDB  = require("./db");

connectDB()
.then(res => {
    app.listen( PORT = 8000 , ()=>{
        console.log(`Listening to port ${PORT}..`);
    })
}).catch(err => console.log("error... ",err))


app.get("/", (req, res)=>{
    res.send("HOME ROUTE");
})



