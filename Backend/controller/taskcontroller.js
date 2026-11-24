const book=require("../models/bookmodel")
const GetBooks = async (req, res) => {
    const data = await book.find();
    res.status(200).json(data);
};

const getOneBook = async (req, res) => {

    const id = req.params.id;

    const data = await book.findById(id);

    if (!data) {
        const error = new Error("Book not found");
        error.statusCode = 404;
        throw error;
    }

    res.status(200).json(data);
};
const addBook=(async (req,res)=>{
    let {bookname,bookprice,stock}=req.body
    let image=(`uploads/book/${req.file.filename}`)
    if(!bookname||!bookprice||!stock||!req.file)
    {
   const error=new Error("All fields are require")
   error.statuscode=400
   throw error
    }
    const data=await book.create({
        bookname:bookname,
        bookprice:bookprice,
        stock:stock,
        image:image})
        res.status(201).json({data})
    
})

const updateBook=async (req,res)=>
{
    let {bookname,bookprice,stock}=req.body
    let Book=await book.findById(req.params.id)
    if(!Book)
    {
        const error = new Error("Book not found");
        error.statusCode = 404;
        throw error;
    }
    Book.bookname=bookname,
    Book.bookprice=bookprice,
    Book.stock=stock
    if(req.file)
    {
        Book.image=`uploads/book/${req.file.filename}`

    }
const updatebook=await Book.save();
    res.status(200).json({
        message: "Book updated successfully",
        data: updatebook
    });
}

const deleteBook=async (req,res)=>{
     let Book=await book.findById(req.params.id)
    if(!Book)
    {
        const error = new Error("Book not found");
        error.statusCode = 404;
        throw error;
    }
await book.findByIdAndDelete(req.params.id);

    res.status(200).json({
        message: "Book deleted successfully"
    });

}


module.exports={getOneBook,addBook,updateBook,deleteBook,GetBooks}