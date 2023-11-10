import dotenv from "dotenv";

dotenv.config()


export const URI = process.env.MONGODB_URI ||   "mongodb+srv://santiyepes:admin123@cluster0.ths3gvo.mongodb.net/admin360?retryWrites=true&w=majority"

export const PORT = process.env.PORT || 4000