const express= require("express")
const dotenv=require("dotenv")
//const connectDB=require("/congif/db")
const authRoutes=require=("/routes/authroutes")

dotenv.config()
connectDB()

const app= express()
app.use=(express.json())

app.use("api/auth", authRoutes)

const PORT=process.env.PORT ||3000
app.listen(PORT, ()=> console.log(`server is running on port ${PORT}`))