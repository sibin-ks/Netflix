const express=require("express")
const router=express.Router()
const bcrypt=require("bcrypt")
const movie=require("../models/moviemodel")
const auth=require("../middleware/auth")
const multer=require("multer")

const storage=multer.diskStorage({
    destination:(req,file,cb)=>
    {
        cb(null,"uploads");
    
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"-"+file.originalname)
    }
})
const file=multer({storage})

// router.get("/",auth,async(req,res)=>{
//     const data=await movie.find({user:req.session.userId})
//     res.render("home" ,{data})
// })


router.get("/", auth, async (req, res) => {
    try {
        // Get all movies belonging to logged-in user
        const recentMovies = await movie.find({
            user: req.session.userId
        }).sort({ _id: -1 });

        // Get top-rated movies
        const topRatedMovies = await movie.find({
            user: req.session.userId
        }).sort({ rating: -1 });

        // Featured movie
        const featuredMovie = recentMovies[0];

        res.render("home", {
            recentMovies,
            topRatedMovies,
            featuredMovie
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong");
    }
});


router.get("/view/:id",auth,async(req,res)=>{
    const single_data=await movie.findById(req.params.id)
    res.render("view",{single_data})
})

router.get("/addmovie",auth,(req,res)=>{
    res.render("addmovie")
})

router.post("/add",file.single("movie-poster"),auth,async(req,res)=>{
let{title,year,duration,rating,language,description}=req.body
const image=`/uploads/${req.file.filename}`
const data=await movie.create({
title:title,year:year,duration:duration,rating:rating,language:language,description:description,movieposter:image,user:req.session.userId
})
res.redirect("/movie/")
})

router.get("/edit/:id",auth,async (req,res)=>{
    const data=await movie.findById(req.params.id)
res.render("editmovie",{data})
})

router.post("/update/:id",file.single("movie-poster"),auth,async (req,res)=>{
    let{title,year,duration,rating,language,description}=req.body
    const data={
title:title,year:year,duration:duration,rating:rating,language:language,description:description,
}
if(req.file)
{
    data.movieposter=`/uploads/${req.file.filename}`
}
    await movie.findByIdAndUpdate(req.params.id,data, { returnDocument: "after" })
    res.redirect("/movie/")
})

router.post("/delete/:id",auth,async(req,res)=>{
    await movie.findByIdAndDelete(req.params.id);
    res.redirect("/movie/");
});
module.exports = router;
