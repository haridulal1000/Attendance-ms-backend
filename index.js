const connectToDB=require('./db');
const express=require('express');
const authRouter=require('./routes/auth');
const checkInRouter=require('./routes/checkin');
const checkOutRouter=require('./routes/checkout');
const getattendacesRouter=require('./routes/getattendances')
const deleteRouter=require('./routes/delete')
const updateRouter=require('./routes/update')
const app=express();
const cors=require('cors');
require('dotenv').config();
const port=process.env.PORT;
app.use(cors());
app.use(express.json());
app.use('/api/auth/',authRouter);
app.use('/api/checkin/',checkInRouter);
app.use('/api/checkout/',checkOutRouter);
app.use('/api/attendances/',getattendacesRouter);
app.use('/api/attendance/',deleteRouter);
app.use('/api/attendance/update/',updateRouter);
app.listen(port,()=>{
console.log('connected to node server');
});
connectToDB();