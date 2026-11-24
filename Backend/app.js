const express=require("express")
const app=express()
require("dotenv").config()
const cookieParser = require("cookie-parser");
const port=process.env.PORT
const movierouter=require("./router/movierouter")
const userrouter=require("./router/userrouter")
const errorHandler=require("./middleware/ErrorHandler")
const connect=require("./config")
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/uploads",express.static("uploads"))
connect()

app.use(cookieParser());
<<<<<<< HEAD
app.use("/api/movie",movierouter)
=======
app.use("/api/book",taskrouter)
>>>>>>> 0b7b7f95fe13dd2a30945b6c8dcb38cdc95de95f
app.use("/auth" , userrouter)

app.use(errorHandler)
app.listen(port,()=>{
    console.log(`server running @ ${port}`)
})