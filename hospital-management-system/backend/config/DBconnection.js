
//database connection method
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
mongoose.set('strictQuery',false)
const url=process.env.MONGO_URL 
//connect to the database
const dbConnect=async()=>{
    try{
    await mongoose.connect(
        url
    )
    console.log("DATABASE CONNECTED ")
}catch(err){
    console.log(err.message)

}
}
export default dbConnect