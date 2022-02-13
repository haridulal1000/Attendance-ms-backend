const express=require('express');
const getUser = require('../middleware/getuser');
const CheckIn = require('../models/Checkin');
const CheckOut = require('../models/CheckOut');
const app=express();
const router=express.Router();
router.get('/',getUser,async (req,res)=>{
    try {
        let success=true;
    const checkIns=await CheckIn.find({userId:req.user.id});
    let checkOuts=[];
    if(checkIns.length===0){
        return res.json({checkIns,checkOuts,success:true});
    }
    
    for(let i=0;i<checkIns.length;i++){
        const checkIn=checkIns[i];
        const checkOut=await CheckOut.findOne(
            {
                userId:checkIn.userId,
                year:checkIn.year,
            date:checkIn.date
        });
        checkOuts.push(checkOut);
    }
    return res.json({checkIns,checkOuts,success:true});
    } catch (error) {
        res.status(500).json({success:false,message:'Internal Server Error',type:500});
    }
    
});
module.exports=router;