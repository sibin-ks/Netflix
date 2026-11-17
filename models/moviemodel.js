const mongoose=require("mongoose")

const movieschema=new mongoose.Schema({
     user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
    title:String,
    year:Number,
    duration:String,
    rating:Number,
    language:String,
    description:String,
    movieposter:String
})
module.exports=mongoose.model("movie",movieschema)