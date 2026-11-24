const multer=require("multer")
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/movie/")
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"-"+file.originalname)
    }
})

const movie=multer({storage})

module.exports=movie;