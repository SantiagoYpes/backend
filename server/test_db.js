import mongoose from "mongoose"
import { URI } from "./config.js";

(async ()=>{
  try{
      mongoose.set('strictQuery', true)
      const db = await mongoose.connect(URI)
      console.log("DB connected", db.connection.name )
      process.exit();
  }
  catch (error){
      console.error(error)
  }
  
})()

