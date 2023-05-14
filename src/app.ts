import * as jwt from "jsonwebtoken";

import express, { Application } from "express";
import Routerindex from "./routes/index"
import * as dotenv from "dotenv";
import cors from 'cors';
import { connectDB } from "./config/db";
import { log } from "console";



const app: Application = express();
app.use(express.json());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(cors());

dotenv.config();
connectDB();

app.use('/', Routerindex);


// Port
const PORT: number = 3008 || 3000
app.listen(PORT, () =>
    console.log(`Server Started on Port ${PORT}`));


