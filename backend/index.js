require('dotenv').config()
console.log(" mongoose_url:", process.env.mongoose_url);

const bcrypt = require('bcrypt')
const express = require('express')
const jwt = require('jsonwebtoken')



const {userRouter}=require("./routes/user")
const {courseRouter}=require("./routes/course")
const {adminRouter}=require("./routes/admin")

const mongoose = require('mongoose');
const app = express()



app.use(express.json());



app.use("/user",userRouter)
app.use("/admin",adminRouter)
app.use("/course",courseRouter)
    
async function main(){
   await mongoose.connect(process.env.mongoose_url)
    app.listen(3000);
    console.log("listening on port 3000")
}
main();


