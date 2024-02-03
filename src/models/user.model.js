const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
        userName : {
             type : String,
             required: [ true,"Username is required"],
             unique : true,
             index: true,
             lowercase : true,
             trim: true,
             minLength : 3,
        },
        email : {
             type : String,
             required: [ true,"email is required"],
             unique : true,
             trim: true
        },
        password : {
             type : String,  // hashed using bcrypt
             required: [ true,"password is required"],
             minLength : [5, "Minimum length of password is 5 chars.."]
        },
        fullName : {
             type : String,
             required: [ true,"Full name is required"],
             trim: true,
             minLength : 3
        },
        avatar : {
             type : String, // cloud url
             required: [ true,"Upload your image.."],
        },
        coverImage : {
             type : String, // cloud url
        },
        watchHistory : [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        refreshToken : {
            type : String
        }
}, { timestamps: true })

userSchema.pre("save", async function(next){
    if (! this.isModified("password")) return next();
    const hashedPass = await bcrypt.hash(this.password, 10);
    this.password = hashedPass
    next();
})


userSchema.methods.checkPassword = async function(pass){
      return bcrypt.compare(pass, this.password)
}

userSchema.methods.generateAccessToken = async function(){
      return jwt.sign({
              _id: this._id,
              email: this.email,
              username: this.userName,
              fullName: this.fullName
            },
            process.env.ACCESS_TOKEN_SECRET_KEY,
            { expiresIn: "1h"}
        )
}

userSchema.methods.generateRefreshToken = async function(){
      return jwt.sign({
              _id: this._id,
            },
            process.env.REFRESH_TOKEN_SECRET_KEY,
            { expiresIn: "10h"}
        )
}


const User = new mongoose.model("User", userSchema);
module.exports = User;
