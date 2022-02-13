const mongoose=require('mongoose');
const {Schema}=mongoose;
const getDateObject=require('../utils/getdate');
//schema for check-outs
const CheckOutSchema=new Schema(
    {
        userId:{
            type:Schema.Types.ObjectId,
            required:true,
            ref:'Employee'
        },
        checkedOut:{
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

const CheckOut=mongoose.model('CheckOut',CheckOutSchema);
CheckOut.createIndexes();
module.exports=CheckOut;