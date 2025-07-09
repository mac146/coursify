const mongoose=require('mongoose')
mongoose.connect(process.env.mongoose_url)

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

const courseSchema = new Schema({
    creatorid: { type: mongoose.Schema.Types.ObjectId, ref: "admins", required: true },
    title: String,
    description: String,
    imageurl: String,
    price: Number
})

const purchaseSchema = new  Schema({
  userid: { type: ObjectId, ref: "users" },
  courseid: { type: ObjectId, ref: "courses" }
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