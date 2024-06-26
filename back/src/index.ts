import express, { Request, Response, urlencoded } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from 'mongoose';
import userRoutes from './routes/user';
import authRoutes from './routes/auth';
import cookieParser from "cookie-parser";
import path from "path";
import {v2 as cloudinary} from 'cloudinary';
// import database from './db/index'
mongoose.connect(process.env.MONGODB as string)
const port =  5000;


          
cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret 
});

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended:true}));
app.use(cors({
  origin:process.env.FRONT_END_URL,
  credentials:true
}));

app.use(express.static(path.join(__dirname,"../../online-system/dist")))

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
