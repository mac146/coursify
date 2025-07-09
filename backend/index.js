const bcrypt = require('bcrypt')
const express = require('express')
const jwt = require('jsonwebtoken')

const {userRouter}=require("./routes/user")
const {courseRouter}=require("./routes/course")
const {adminRouter}=require("./routes/admin")

const mongoose = require('mongoose');
const app = express()



app.use(express.json());

const Jwt_SECRET = "macc1234";

app.use("/user",userRouter)
app.use("/admin",adminRouter)
app.use("/course",courseRouter)
    
async function main(){
   await mongoose.connect("mongodb+srv://mayankkumars584:Mayank%40146@cluster0.t1lcct0.mongodb.net/coursify-database?retryWrites=true&w=majority")
    app.listen(3000);
    console.log("listening on port 3000")
}
main();


