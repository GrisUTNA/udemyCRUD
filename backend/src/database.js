import mongoose from "mongoose";

//const URI = "mongodb://localhost/prueba";
const URI = "mongodb+srv://prueba:prueba@cluster0.52iec.mongodb.net/crududemy";

const connectDB=async()=>{
  try{
    const db=await mongoose.connect(URI)
      console.log('Base de datos conectada!!!', db.connection.name);
    }catch(error){
      console.log('Error: ',error.message)
    }
}   
  
export default connectDB;
