const jwt =require('jsonwebtoken');
require('dotenv').config();
const KEY=process.env.KEY;
//middleware to get the id of the logged in user
const getUser= (req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        return res.status(401).json({error:'User not found'});
    }
    try {
        jwt.verify(token, KEY,(err,user)=>{
            if(err){
                console.log('error');
       return res.status(401).json({error:'Error in getting user',success:false,type:401});
            }
            req.user=user;
        next();
        });
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Error in getting user',success:false,type:500});
    }
    
}
module.exports=getUser;