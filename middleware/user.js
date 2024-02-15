const jwt=require('jsonwebtoken');
const secret="Niraj";

function userMiddleware(req,res,response){
    const token=req.headers.authorization;
    const words=token.split(" ");
    const jwtToken=words[1];

    try{
        const decodedPayload=jwt.verify(jwtToken,secret);
        if(decodedPayload.username){
            //let's take the username from payload(which we have defined in jwt.sign()) and make it a property of req object
            req.username=decodedPayload.username;
            next();
        }
        else{
            req.status(403).json({
                msg:"Auth failed"
            })
        }
    }
    catch(error){
        req.json({
            msg:"Invalid token/expired"
        })
    }
}

module.exports=userMiddleware;