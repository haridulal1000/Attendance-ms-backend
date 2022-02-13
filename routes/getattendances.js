const express=require('express');
const getUser = require('../middleware/getuser');
const Attendance = require('../models/Attendance');
const app=express();
const router=express.Router();
//getting the list of attendances for a particular logged in user
router.get('/',getUser,async (req,res)=>{
    try {
        const attendances= await Attendance.find({
            userId:req.user.id
        });
        return res.json({success:true,type:200,attendances:attendances});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false,message:'Internal Server Error',type:500});
    }
    
});
module.exports=router;