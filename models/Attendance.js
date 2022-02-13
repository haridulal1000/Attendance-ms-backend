const mongoose=require('mongoose');
const {Schema}=mongoose;
const getDateObject=require('../utils/getdate');
//schema for check-outs
const AttendanceScheme=new Schema(
    {
        userId:{
            type:Schema.Types.ObjectId,
            required:true,
            ref:'Employee'
        },
        checkedIn:{
            type:Boolean,
            default:true
        },Year:{
            type:Number,
            default:getDateObject.getYear
        },
        Month:{
            type:Number,
            default:getDateObject.getMonth
        },
        Date:{
            type:Number,
            default:getDateObject.getDate
        },
        checkInHours:{
            type:Number,
            default:getDateObject.getHour
        },
        checkInMinute:{
            type:Number,
            default:getDateObject.getMinute
        },
        checkInSecond:{
            type:Number,
            default:getDateObject.getSecond
        },
        checkedOut:{
            type:Boolean,
            default:false
        },
        checkOutHours:{
            type:Number,
            default:getDateObject.getHour
        },
        checkOutMinute:{
            type:Number,
            default:getDateObject.getMinute
        },
        checkOutSecond:{
            type:Number,
            default:getDateObject.getSecond
        },
        remarks:{
            type:String,
            default:'No Remarks'
        }
        
    }
);

const Attendance=mongoose.model('Attendance',AttendanceScheme);
Attendance.createIndexes();
module.exports=Attendance;