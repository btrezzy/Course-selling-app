const jwt=require('jsonwebtoken')
const secret="Niraj"

function adminMiddleware(req,res,next){
     const token=req.headers.authorization;   // Bearer token
     const words=token.split(" ");
     const jwtToken=words[1];

     try{
     const decodedPayload=jwt.verify(jwtToken,secret);
    //if the decoded payload contains a username property which we have added while making jwt signature - jwt.sign()
    if(decodedPayload.username){
        next();
    }
    else{
        res.status(403).json({
            msg: "You are not authenticated"
        })
    }
       
    }
    catch(error){
        res.json({
            msg:"Invalid token / expired!"
        })
    }
    
}

module.exports=adminMiddleware;