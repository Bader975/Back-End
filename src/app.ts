import express, { Application } from "express";
import Routerindex from "./routes/index"
import * as dotenv from "dotenv";
import cors from 'cors';
import { connectDB } from "./config/db";
import helmet from "helmet";
import compression from 'compression';

const app: Application = express();
const PORT: number | string = process.env.PORT || 3000
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb' }));
app.use(cors());
app.use(helmet());
app.use(compression());
dotenv.config();
connectDB();
app.use('/', Routerindex);

// Port
app.listen(PORT, () =>
    console.log(`Server Started on Port ${PORT}`));
