//connecting to the database
const mongoose=require('mongoose');
const mongooseURI='mongodb://localhost:27017/Employees?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';
const connectToDB=()=>{
    mongoose.connect(mongooseURI,()=>{
        console.log('Connected to database');
    });
}
module.exports=connectToDB;