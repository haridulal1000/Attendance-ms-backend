const express=require('express');
const getUser = require('../middleware/getuser');
const CheckIn = require('../models/Checkin');
const CheckOut=require('../models/CheckOut');
const Employee = require('../models/Employee');
const getDateObject = require('../utils/getdate');
const router=express.Router();

router.post('/',getUser,async (req,res)=>{ 
    try {
        let success=true;
    const newCheckOut=new CheckOut({userId:req.user.id});
    const checkIn=await CheckIn.findOne(
        {
            userId:req.user.id,
        year:newCheckOut.year,
        month:newCheckOut.month,
        date:newCheckOut.date
    });
console.log('Checkin',checkIn);
if(checkIn===null){
    success=false;
}
const checkOut=await CheckOut.findOne(
    {
        userId:newCheckOut.userId,
    year:newCheckOut.year,
    month:newCheckOut.month,
    date:newCheckOut.date
});
console.log('Checkout',checkOut)
if(checkOut!==null){
    success=false;
}
    
    if(!success){
        return res.status(400).json({success:false,message:'Not checkedIn'});
    }else{
        await newCheckOut.save();
    //console.log(checkOut);
    const user=await Employee.findById(req.user.id);
    res.json({user:user,success:true});
    }
    } catch (error) {
        res.status(500).json({success:false,message:'Internal Server Error',type:500});
    }
    
    
});
module.exports=router;