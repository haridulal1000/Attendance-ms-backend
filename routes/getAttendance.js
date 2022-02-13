const express = require("express");
const getUser = require("../middleware/getuser");
const CheckIn = require("../models/Checkin");
const CheckOut = require("../models/CheckOut");

const router=express.Router();
router.get('/getAttendance',getUser,async (req,res)=>{
const attendances=[];
const checkedIns=await CheckIn.findById(req.user.id);

});