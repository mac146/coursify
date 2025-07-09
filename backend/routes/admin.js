const{Router}=require('express')
const{adminModel, courseModel}=require("../db")
const adminRouter=Router()
const adminmiddleware = require("../middleware/adminmiddleware");
const z = require("zod");
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken')
const Jwt_ADMIN_SECRET="1234"

adminRouter.post("/signup",async(req,res)=>{
    const hasuppercase = (val) => /[A-Z]/.test(val);
        const haslowercase = (val) => /[a-z]/.test(val);
        const specialcase = (val) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val);
    
        const requirebody=z.object({
            firstname: z.string().min(3).max(10),
            lastname: z.string().min(3).max(10),
            email: z.string().email(),
            password:z.string().min(3).max(6)
            .refine(hasuppercase,{message:"should contain one uppercase"})
            .refine(haslowercase ,{message:"should contain one lowercase"})
            .refine(specialcase ,{message:"should contain one specialcase"})
        })
    
        const parsedatawithsuccess=requirebody.safeParse(req.body);
    
        if(!parsedatawithsuccess.success){
            res.status(400).json({
                message:"invalid form of data",
                error:parsedatawithsuccess.error.errors
            })
            return;
        }
    
       const {email,password,firstname,lastname}=parsedatawithsuccess.data
    
        console.log("Password received during signup:", password); 
        const hashedpassword = await bcrypt.hash(password, 5)
        console.log(hashedpassword)
        try {
            await adminModel.create({
                firstname:firstname,
                lastname:lastname,
                password: hashedpassword,
                email: email
            })
    
            res.json({
                message: "you are signed up"
            })
    
        }
        catch (err) {
            res.status(500).json({
                message: "Signup failed",
                error: err.message
            });
        }
})

adminRouter.post("/signin",async(req,res)=>{
    const {password,email} = req.body
    
    const admin = await adminModel.findOne({
        email: email
    })
    if (!admin) {
        return res.json({ message: "user not found" })
    }
    console.log("Entered password:", password);
    console.log("Stored hashed password:", user.password);

    const matchedpassword = await bcrypt.compare(password, user.password)
    if (matchedpassword) {
        const token = jwt.sign({
            id: user._id,
            
        }, Jwt_ADMIN_SECRET)

        res.json({
            token
        })
    }
    else {
        res.status(403).json({
            message: "invalid user"
        })
    }
})


adminRouter.post("/newcourse",adminmiddleware,async(req,res)=>{
    const adminid=req.userid
    const {title,description,imageurl,price}=req.body

    const course=await courseModel.create({
        title,
        description,
        imageurl,
        price,
        courseby:adminid
    })
    res.json({
        message:"course created",
        courseid:course._id
    })
})

adminRouter.delete("/deleting-content",(req,res)=>{

})

adminRouter.put("/updating-course",adminmiddleware,async(req,res)=>{
    
    const {courseid,title,description,imageurl,price}=req.body
    const course=await courseModel.findOneAndUpdate({ _id: courseid, createdBy: req.adminid },{
        title,
        description,
        imageurl,
        price
    }, { new: true }   )

    res.json({
        message:"update succesfully"
    })

})

module.exports={
    adminRouter:adminRouter
}

