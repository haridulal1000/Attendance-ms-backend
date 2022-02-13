const jwt =require('jsonwebtoken');
const KEY='secretKey';
const getUser= (req,res,next)=>{
    const token=req.header('auth-token');
    //console.log(token);
    if(!token){
        return res.status(401).json({error:'User not found'});
    }
    try {
        jwt.verify(token, KEY,(err,user)=>{
            if(err){
                console.log('error');
       return res.status(401).json({error:'Error in getting user',success:false});
            }
            req.user=user;
        next();
        });
        
        
    } catch (error) {
        console.log(error);
        res.status(401).json({error:'Error in getting user',success:false});
    }
    
}
module.exports=getUser;