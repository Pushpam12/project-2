const mongoose = require("mongoose")

const { DATABASE_NAME } = require("./../constants.js")
const mongo_url = `${process.env.MONGO_URL}/${DATABASE_NAME}`;
// console.log(mongo_url);

module.exports = async function connectDB(){
    try {
        const connect = await mongoose.connect(mongo_url)
        console.log("Connected to db hosted : ",connect.connection.host);
    } catch (error) {
        console.log("Error in connection :", error.message);
        process.exit(1)
    }
}
