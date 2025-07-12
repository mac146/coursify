const mongoose=require('mongoose')
require('dotenv').config();
mongoose.connect(process.env.mongoose_url)

const Schema=mongoose.Schema


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

const courseSchema = new Schema({
    creatorid: { type: mongoose.Schema.Types.ObjectId, ref: "admins", required: true },
    title: String,
    description: String,
    imageurl: String,
    price: Number
})

const purchaseSchema = new  Schema({
  userid: { type: Schema.Types.ObjectId, ref: "users", required: true },
  courseid: { type: Schema.Types.ObjectId, ref: "courses", required: true }
})

const userModel = mongoose.model("users", user);
const adminModel = mongoose.model("admins", admin);
const courseModel = mongoose.model("courses", courseSchema);
const purchaseModel = mongoose.model("purchases", purchaseSchema);


module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
};