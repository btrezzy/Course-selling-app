const express=require('express');
const app=express();
const adminRouter=require('./routes/admin');
const userRouter=require('./routes/user');

//todo: zod for input validation

app.use(express.json());
app.use("/admin",adminRouter);
app.use("/user",userRouter);

app.listen(3000,()=>{
    console.log("Server started at port 3000")
})

