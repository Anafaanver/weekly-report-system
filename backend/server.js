import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./src/routes/authRoutes.js";
import reportRoutes from "./src/routes/reportRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";


dotenv.config();


const app = express();


app.use(cors());

app.use(express.json());
app.use("/api/projects", projectRoutes);


// MongoDB Connection

mongoose
.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err)=>{
    console.log(err);
});


// Routes

app.get("/",(req,res)=>{
    res.send("Weekly Report API Running");
});


app.use("/api/auth", authRoutes);

app.use("/api/reports", reportRoutes);



const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{

console.log(`Server running on ${PORT}`);

});