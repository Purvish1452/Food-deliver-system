import mongoose from "mongoose";

export const connectDB=async()=>{
    //username Purvish
    //password 14521452
    await mongoose.connect('mongodb+srv://Purvish:14521452@cluster0.a0fdazg.mongodb.net/food-del?retryWrites=true&w=majority').then(()=>{
        console.log("DB Connected");
    })
}