const{Router}=require('express')
const courseRouter=Router()
const{purchaseModel, courseModel}=require("../db")
const usermiddleware = require("../middleware/usermiddleware");

courseRouter.get("/preview",async(req,res)=>{
    const courses=await courseModel.find({})

    res.json({
        courses
    })
})

courseRouter.post("/purchase",usermiddleware,async(req,res)=>{
   const userid=req.userid
   const courseid=req.body.courseid

   console.log("USER ID from middleware:", req.userid);
    console.log("COURSE ID from body:", courseid);



   const purchases=await purchaseModel.create({
    userid,
    courseid
   })
   res.json({
    message:"you have succesfilly purchase the course"
   })
})

module.exports={
    courseRouter:courseRouter
}
