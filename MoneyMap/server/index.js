import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoute from './routes/authRoutes.js';
import main from './config/config.js';
import incomeRoute from './routes/incomeRoutes.js'
import expensesRoute from './routes/expensesRoutes.js';
// EXPRESS OBJECT
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5050
app.use(cors())
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({extended:false}))

main()

// middleware
// http://localhost:5050/api/v1
app.use("/api/v1",authRoute)
app.use("/api/v2",incomeRoute)
app.use("/api/v3",expensesRoute)


app.listen(PORT,()=> console.log(`Server running at localhost:${PORT}`))



