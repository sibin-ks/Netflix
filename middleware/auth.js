const auth=(req,res,next)=>{
    if(req.session.user)
    {
        next()
    }
    else
    {
        return res.redirect("/auth/login")
    }
}
module.exports=auth;