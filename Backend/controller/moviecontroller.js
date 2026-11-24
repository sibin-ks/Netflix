const movie=require("../models/moviemodel")
const WatchLater = require('../models/watchlater');
const Getmovies = async (req, res) => {
    const data = await movie.find();
    res.status(200).json(data);
};

const getOnemovie = async (req, res) => {

    const id = req.params.id;

    const data = await movie.findById(id);

    if (!data) {
        const error = new Error("movie not found");
        error.statusCode = 404;
        throw error;
    }

    res.status(200).json(data);
};
const addmovie=(async (req,res)=>{
    let {title:title,year:year,duration:duration,rating:rating,language:language,description:description}=req.body
    let image=(`uploads/movie/${req.file.filename}`)
    if(!title||!year||!duration ||!rating ||!language ||!description ||!req.file)
    {
   const error=new Error("All fields are require")
   error.statuscode=400
   throw error
    }
    const data=await movie.create({
       title:title,
       year:year,
       duration:duration,
       rating:rating,
       language:language,
       description:description,
        image:image})
        res.status(201).json({data})
    
})

const updatemovie=async (req,res)=>
{
    let {title,year,duration,rating,language,description }=req.body
    let Movie=await movie.findById(req.params.id)
    if(!Movie)
    {
        const error = new Error("movie not found");
        error.statusCode = 404;
        throw error;
    }
    Movie.title=title,
    Movie.year=year,
    Movie.duration=duration,
    Movie.rating=rating,
    Movie.language=language,
    Movie.description=description
    if(req.file)
    {
        Movie.image=`uploads/movie/${req.file.filename}`

    }
const updatemovie=await Movie.save();
    res.status(200).json({
        message: "movie updated successfully",
        data: updatemovie
    });
}

const deletemovie=async (req,res)=>{
     let Movie=await movie.findById(req.params.id)
    if(!Movie)
    {
        const error = new Error("movie not found");
        error.statusCode = 404;
        throw error;
    }
await movie.findByIdAndDelete(req.params.id);

    res.status(200).json({
        message: "movie deleted successfully"
    });

}

const watchlater =async (req, res) => {
    try {
        const userId = req.session.userId;

        if (!userId) {
            return res.redirect('/auth/login');
        }

        const watchlist = await WatchLater.findOne({
            user: userId
        });

        let data = [];

        if (watchlist) {
            data = await movie.find({
                _id: { $in: watchlist.movies }
            });
        }

        res.render('watchlater', { data });

    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
};


const addwatchlater = async (req, res) => {
    try {
        const userId = req.session.userId;
        const movieId = req.params.id;

        if (!userId) {
            return res.redirect('/auth/login');
        }

        const Movie = await movie.findById(movieId);

        if (!Movie) {
            return res.status(404).send('Movie not found');
        }

        await WatchLater.findOneAndUpdate(
            { user: userId },
            { $addToSet: { movies: movieId } },
            { upsert: true, new: true }
        );

        res.redirect('/movie/');

    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
};

const removewatchlater=async (req, res) => {
    try {
        const userId = req.session.userId;
        const movieId = req.params.id;

        await WatchLater.findOneAndUpdate(
            { user: userId },
            { $pull: { movies: movieId } }
        );

        res.redirect('/movie/watchlater');

    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
};



module.exports={getOnemovie,addmovie,updatemovie,deletemovie,Getmovies,removewatchlater,addwatchlater,watchlater}