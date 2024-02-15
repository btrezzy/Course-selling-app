const moongose=require('mongoose');

moongose.connect();

const adminSchema= new moongose.Schema({
    username:String,
    password:String
})

const userSchema=new moongose.Schema({
    username:String,
    password:String,
    purchasedCourses:[{
         type:moongose.Schema.Types.ObjectId,
         ref:'Course'
         //array of such obejectID which the user has purchased
    }]
})

const courseSchema=new moongose.Schema({
    title:String,
    description:String,
    price:Number,
    imageLink:String
})

const Admin=new moongose.model('Admin',adminSchema);
const User=new moongose.model('User',userSchema);
const Course=new moongose.model('Course',courseSchema);

module.exports={
    Admin,
    User,
    Course
}

