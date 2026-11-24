const express=require("express")
const router=express.Router()
const validate=require("../middleware/validateToken")
const moviemulter=require("../middleware/moviemulter")
const {getOnemovie,addmovie,updatemovie,deletemovie,Getmovies,removewatchlater,addwatchlater,watchlater}=require("../controller/moviecontroller")
router.use(validate)
router.route("/").get(Getmovies).post(moviemulter.single("image"),addmovie)
router.route("/:id").get(getOnemovie).put(moviemulter.single("image"),updatemovie).delete(deletemovie);
router.route('/watchlater/:id').post(addwatchlater).delete(removewatchlater)
router.route('/watchlater').get(watchlater)
module.exports=router
