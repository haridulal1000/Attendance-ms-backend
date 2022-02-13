const express=require('express');
const getUser = require('../middleware/getuser');
const CheckIn = require('../models/Checkin');
const CheckOut = require('../models/CheckOut');
const app=express();
const router=express.Router();
router.put('/',getUser,async (req,res)=>{
    try{

        let success=true;
        console.log(req.body.checkIn.id);
        const checkIn=await CheckIn.findById(req.body.checkIn.id);
        console.log(checkIn);
        if(!checkIn){
            console.log('Not found')
            return res.status(400).json({success:false});
        }
        if(checkIn.userId.toString()!==req.user.id){
            console.log('Not found')
            return res.status(401).json({success:false});
        }
        
        await CheckIn.findByIdAndUpdate(req.body.checkIn.id,{
            checkedIn:req.body.checkIn.checkedIn,
            year:req.body.checkIn.year,
            month:req.body.checkIn.month,
            date:req.body.checkIn.date,
            hours:req.body.checkIn.hours,
            minute:req.body.checkIn.minute,
            second:req.body.checkIn.second,
        });
        const checkOut=await CheckOut.findOne({year:checkIn.year,month:checkIn.month,date:checkIn.date,userId:req.user.id});
        if(checkOut){
            await CheckOut.findByIdAndUpdate(req.body.checkOut.id,{
                checkedOut:req.body.checkOut.checkedIn,
                year:req.body.checkOut.year,
                month:req.body.checkOut.month,
                date:req.body.checkOut.date,
                hours:req.body.checkOut.hours,
                minute:req.body.checkOut.minute,
                second:req.body.checkOut.second,
            });
            await newCheckOut.save();
            success=true;
        }else{
            const newCheckOut= await CheckOut.create(
                {
                    userId:req.user.id,
                checkedOut:req.body.checkOut.checkedIn,
                year:req.body.checkOut.year,
                month:req.body.checkOut.month,
                date:req.body.checkOut.date,
                hours:req.body.checkOut.hours,
                minute:req.body.checkOut.minute,
                second:req.body.checkOut.second
            });
            await newCheckOut.save();
            success=true;
        }
        console.log('Deleted');
       return res.json({success:true});
    }catch(e){
        res.status(500).json({success:false,message:'Internal Server Error',type:500});
    }
    
    
   
});
module.exports=router;