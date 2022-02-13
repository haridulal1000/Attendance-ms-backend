const mongoose=require('mongoose');
const {Schema}=mongoose;
const EmployeeSchema=new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        date:{
            type:Date,
            default:Date.now
        }
    }
);

const Employee=mongoose.model('Employee',EmployeeSchema);
Employee.createIndexes();
module.exports=Employee;