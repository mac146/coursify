const mongoose=require('mongoose')
mongoose.connect("mongodb+srv://mayankkumars584:Mayank%40146@cluster0.t1lcct0.mongodb.net/coursify-database?retryWrites=true&w=majority")

const Schema=mongoose.Schema
const ObjectId=mongoose.Types.ObjectId

const user=new Schema({

    email: {type:String,unique:true},
    password:String,
    firstname:String,
    lastname:String
})

const admin=new Schema({
   
    email: {type:String,unique:true},
    password:String,
    firstname:String,
    lastname:String

})

const course=new Schema({
    creatorid:ObjectId,
    title:String,
    description:String,
    imageurl:String,
    price:Number
    
})

const purchase=new Schema({
    courseid:ObjectId,
    userid:ObjectId

})

const userModel = mongoose.model("users", user);
const adminModel = mongoose.model("admins", admin);
const courseModel = mongoose.model("courses", course);
const purchaseModel = mongoose.model("purchases", purchase);


module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
};