import mongoose from "mongoose";
const incomeSchema =  new mongoose.Schema({
      amount: {type: String,required: true},
      description: {type: String,required: false},
      date: { type: String, required: true}
},
{ timestamps:true}
)

export default mongoose.model('Income',incomeSchema);
