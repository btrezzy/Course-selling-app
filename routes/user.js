const express=require('express');
const {Router}=require('express');
const router=Router();
const userMiddleware=require('../middleware/user');
const {User,Course}=require("../db/index");
const app=express();
const secret="Niraj"

app.use(express.json());

router.post('/signup',async (req,res)=>{
     const username=req.body.username;
     const password=req.body.username;
      
     const existingUser=await User.find({
        username
     })

     if(existingUser){
        res.json({
            msg:"User exists, kindly sign-up"
        })
     }

     User.create({
        username,
        password
     })

     res.status(200).json({
        msg:"User created successfully"
     })

})

router.post('/signin',async (req,res)=>{
      const username=req.body.username;
      const password=req.body.password;

      const existingUser=await User.find({
        username,
        password
      })

      if(existingUser){
        const token=jwt.sign({username},secret);
        //here username is one of the property of our payload that we made...
        res.status(200).json({
            token:token
        })
        
      }
      else{
        req.status(404).json({
            msg:"Invalid username / password"
        })
      }
})

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic  
    const allCourses=await Course.find({});
    //if wanted to show all published courses,: Course.find({is_published:true}) and reSchema design

    res.json({
      Courses:allCourses
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId=req.params.courseId;

    // const course=await Course,fin


});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    
    const requsername=await User.findOne({username:req.username});

    res.json({
        yourCourses:requsername.purchasedCourses
    })


});

module.exports=router;