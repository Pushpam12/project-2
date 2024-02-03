const  { apiError }  = require("./../utils/apiError.js");
const  { apiResponse } = require("./../utils/apiResponse.js");
const  { uploadToCloud , removeFromCloud }  = require("./../utils/cloudnary.js");

const User = require("./../models/user.model.js");


async function registerUser(req, res){
    
        const { userName , fullName , password, email } = req.body;
        if( [userName,fullName,password,email].some(e => e?.trim() == false )){
            throw new apiError(400, "All feilds are mandatory!!");
        }


        const userExists = await User.findOne({
            $or : [{email} , {fullName}]
        });

        if(userExists){
            throw new apiError(409, "The user already exists with the given name or email.");
        }

        let avatarLocalUrl = "", coverImageLocalUrl = "";
        if (req.files){
             if(Array.isArray(req.files.avatar) && req.files.avatar.length > 0){
                   avatarLocalUrl = req.files.avatar[0].path
             }
             if(Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
                   coverImageLocalUrl = req.files.coverImage[0].path
             }
        };

        if( ! avatarLocalUrl) throw new apiError(400, "Avatar image is required.");

        const avatarUrl  = await uploadToCloud(avatarLocalUrl, "avatar");
        const coverImageUrl  = await uploadToCloud(coverImageLocalUrl, "images");

        if(!avatarUrl) throw new apiError(400, "Avatar image is required again. Upload failed!!");

        const user = await User.create({
                userName,
                email,
                fullName : fullName,
                password,
                coverImage : coverImageUrl?.url,
                avatar : avatarUrl.url,
        })

        const createdUser = await User.findById(user._id).select("-password -refreshToken");

        if(! createdUser ){
            removeFromCloud("avatar",avatarUrl.public_id);
            removeFromCloud("images",coverImageUrl.public_id);
            throw new apiError(500, "Can't Register the User. Try Again.")
        }

        return res.status(201).json(new apiResponse(200, 
            createdUser, "User registered successfully")
        )

}


module.exports = { registerUser }