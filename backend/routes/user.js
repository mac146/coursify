const{Router}=require('express')
const userRouter=Router()
const {userModel}=require("../db")
const usermiddleware = require("../middleware/usermiddleware");


userRouter.post("/signup", async (req, res) => {
    const hasuppercase = (val) => /[A-Z]/.test(val);
    const haslowercase = (val) => /[a-z]/.test(val);
    const specialcase = (val) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val);

    const requirebody=z.object({
        username: z.string().min(3).max(10),
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

    const username = req.body.username
    const password = req.body.password
    const email = req.body.email

    console.log("Password received during signup:", password); 
    const hashedpassword = await bcrypt.hash(password, 5)
    console.log(hashedpassword)
    try {
        await userModel.create({
            username: username,
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

userRouter.post("/signin", async (req, res) => {
    const password = req.body.password
    const email = req.body.email

    const user = await userModel.findOne({
        email: email
    })
    if (!user) {
        return res.json({ message: "user not found" })
    }
    console.log("Entered password:", password);
    console.log("Stored hashed password:", user.password);

    const matchedpassword = await bcrypt.compare(password, user.password)
    if (matchedpassword) {
        const token = jwt.sign({
            id: user._id,
            role:user.role
        }, Jwt_SECRET)

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

userRouter.get("/purchases",usermiddleware,(req,res)=>{
    
})

module.exports={
    userRouter:userRouter
}