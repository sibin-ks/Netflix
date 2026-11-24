
const mongoose=require("mongoose");
const bookSchema=new mongoose.Schema({
    bookname:{
        type:String,
        required:true
    },
    bookprice:{
        type:Number,
        required:true,
    },
    stock:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        default:null
    }
});
module.exports=mongoose.model("Book",bookSchema);