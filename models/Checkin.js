const mongoose=require('mongoose');
const {Schema}=mongoose;
const getDateObject=require('../utils/getdate');
const CheckInSchema=new Schema(
    {
        userId:{
            type:Schema.Types.ObjectId,
            required:true,
            ref:'Employee'
        },
        checkedIn:{
            type:Boolean,
            default:true
        },
        year:{
            type:Number,
            default:getDateObject.getYear
        },
        month:{
            type:Number,
            default:getDateObject.getMonth
        },
        date:{
            type:Number,
            default:getDateObject.getDate
        },
        hours:{
            type:Number,
            default:getDateObject.getHour
        },
        minute:{
            type:Number,
            default:getDateObject.getMinute
        },
        second:{
            type:Number,
            default:getDateObject.getSecond
        }
    }
);

const CheckIn=mongoose.model('CheckIn',CheckInSchema);
CheckIn.createIndexes();
module.exports=CheckIn;