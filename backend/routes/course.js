const{Router}=require('express')
const courseRouter=Router()

courseRouter.get("/preview",async(req,res)=>{
    res.json({
        message:"preview all the courses"
    })
})

courseRouter.post("/purchase",async(req,res)=>{

})

module.exports={
    courseRouter:courseRouter
}
