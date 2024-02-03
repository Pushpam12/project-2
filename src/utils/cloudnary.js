const cloudinary = require("cloudinary").v2;
const fs = require("fs")
          
cloudinary.config({ 
        cloud_name: process.env.CLOUDNARY_CLOUD_NAME, 
        api_key: process.env.CLOUDNARY_API_KEY, 
        api_secret: process.env.CLOUDNARY_API_SECRET 
});

const folders = ["images", "videos", "avatar"];

async function uploadToCloud(localFilePath, folder = folders[0]){
        try {
            if (!localFilePath ) return false;

            const response = await cloudinary.uploader.upload(localFilePath, {
                resource_type: "auto",
                use_filename: true,
                folder: folder
            });

            fs.unlinkSync(localFilePath);
            // console.log(response.public_id, response.url);
            return response;
        } catch (error) {
            fs.unlinkSync(localFilePath);
            
            console.log("Upload to cloudinary failed !!");
            return false
        }
}


async function removeFromCloud(folder, image){
             cloudinary.api.delete_resources([folder+image], 
                    { type: 'upload', resource_type: 'image' })

}

module.exports = { uploadToCloud, removeFromCloud } ;