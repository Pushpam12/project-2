const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseAggregatePaginate =  require("mongoose-aggregate-paginate-v2");
// to be installed

const videoSchema = new Schema({
        videoFile : {
              type : String,
              required : [true, "No video file given "]
        },
        thumbnail : {
              type : String,
              required : [true, "No thumbnail given "]
        },
        title : {
              type : String,
              required : [true, "No title file ggiven "]
        },
        description : {
              type : String,
        },
        duration : {
              type : Number, // video file
              required : true
        },
        views : {
              type : Number,
              default : 0
        },
        isPublished : {
              type : Boolean,
              default : false
        },
        owner : {
            type: Schema.Types.ObjectId,
            ref : "User"
        }
}, { timestamps: true })

const Video = new mongoose.model("Video", videoSchema);
module.exports = Video;
