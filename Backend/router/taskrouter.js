const express=require("express")
const router=express.Router()
const validate=require("../middleware/validateToken")
const bookmulter=require("../middleware/bookmulter")
const {getOneBook,addBook,updateBook,deleteBook,GetBooks}=require("../controller/taskcontroller")
router.use(validate)
router.route("/").get(GetBooks).post(bookmulter.single("image"),addBook)
router.route("/:id").get(getOneBook).put(bookmulter.single("image"),updateBook).delete(deleteBook);





module.exports=router