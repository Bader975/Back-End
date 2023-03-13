import * as jwt from "jsonwebtoken";

import  express,{Application} from "express";
import  Routerindex  from "./routes/index"
import  RouterTask  from "./routes/project.route";
import * as dotenv from "dotenv";
import cors from 'cors';



const app:Application= express();
app.use(express.json());
dotenv.config();
app.use('/',Routerindex);
app.use(cors());


// Port
app.listen(3008, () => console.log("Server Started"));