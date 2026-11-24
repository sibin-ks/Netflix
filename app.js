const express=require("express")
const mongoose=require("mongoose")
const session = require("express-session")
const app=express()

const movierouter=require("./router/movierouter")
const authrouter=require("./router/authrouter")

app.use(express.urlencoded({extended:true}))
app.set("view engine","hbs")
app.use(express.static("public"))
app.use("/uploads",express.static("uploads"))
app.use(session({
    secret: "movie_secret_key",
    resave: false,
    saveUninitialized: false,
}));

mongoose.connect("mongodb://localhost:27017/MOVIE")
.then(()=>{console.log("connection success")})
.catch(()=>{console.log("connection faild")})

app.use("/movie", movierouter )
app.use("/auth", authrouter);


app.listen(3000,()=>{
    console.log("server running")
})