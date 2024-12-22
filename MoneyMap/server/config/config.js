import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const main = async()=>{
   try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('connected to db server...');
   } catch (error) {
    console.log(error);
   }
}

export default main;

