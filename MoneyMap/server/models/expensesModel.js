import mongoose from "mongoose";
const expensesSchema =  new mongoose.Schema({
      amount: {type: String,required: true},
      description: {type: String,required: false},
      category:{type:String},
      date: { type: String, required: true}
},
{ timestamps:true}
)

export default mongoose.model('Expense',expensesSchema);
