const express=require('express');
const getUser = require('../middleware/getuser');
const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');
const router=express.Router();
//adding check-in into the database
router.post('/',getUser,async (req,res)=>{
    try {
     let success=true;
     const newAttendance=new Attendance({
         userId:req.user.id,
         remarks:req.body.remarks
     });
    const attendance=await Attendance.findOne(
        {
            userId:req.user.id,
            Year:newAttendance.Year,
            Month:newAttendance.Month,
            Date:newAttendance.Date
    });
    if(attendance && attendance.checkedIn){
        return res.status(400).json({success:false,type:400});
    }else{
        await newAttendance.save();
        return res.json({success:true,type:200});
    }



    
    
    } catch (error) {
        res.status(500).json({success:false,message:'Internal Server Error',type:500}); 
    }
    

    
});
module.exports=router;