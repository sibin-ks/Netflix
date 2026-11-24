const express=require("express");
const router=express.Router();
const bcrypt=require("bcrypt");
const user=require("../models/usermodel");
const auth=require("../middleware/auth")

router.get("/register",(req,res)=>{
    res.render("register");
});

router.post("/register",async(req,res)=>{
    try{
        const{username,email,password}=req.body;
        const existingUser=await user.findOne({email});
        if (existingUser) {
            return res.send("Email already registered");
        }
        const hash=await bcrypt.hash(password,10);
        await user.create({
            username:username,
            email:email,
            password:hash
        });
        res.redirect("/auth/login");
    } catch (error) {
        console.log(error);
        res.send("Registration failed");
    }
});

router.get("/login",(req,res)=>{
    res.render("login");
});

router.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body;
        const data=await user.findOne({email});
        if(!data){
            return res.send("Invalid email");
        }
        const match=await bcrypt.compare(password,data.password);
        if(!match) {
            return res.send("Invalid password");
        }
        req.session.userId = data._id.toString();
        req.session.user = {
            id: data._id.toString(),
            username: data.username,
            email: data.email
        };
        res.redirect("/movie/");
    } catch (error) {
        console.log(error);
        res.send("Login failed");
    }
});
router.get("/logout",(req,res)=>{
    req.session.destroy(()=>{
        res.redirect("/auth/login");
    });
});

module.exports=router;