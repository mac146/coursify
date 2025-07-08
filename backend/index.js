const bcrypt = require('bcrypt')
const express = require('express')
const jwt = require('jsonwebtoken')

const authmiddleware = require('./authmiddleware');
const {userRouter}=require("./routes/user")
const {courseRouter}=require("./routes/course")

const mongoose = require('mongoose');
const app = express()
mongoose.connect("mongodb+srv://mayankkumars584:Mayank%40146@cluster0.t1lcct0.mongodb.net/coursify-database?retryWrites=true&w=majority")
const {z}=require("zod")

const { userModel, todoModel } = require("./db");
app.use(express.json())

const Jwt_SECRET = "macc1234";

app.use("/user",userRouter)
app.use("/course",courseRouter)
    
app.listen(3000)

