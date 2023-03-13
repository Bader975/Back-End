import * as jwt from "jsonwebtoken";

import  express,{Application} from "express";
import  Routerindex  from "./routes/index"
import  RouterTask  from "./routes/project.route";
import * as dotenv from "dotenv";


const app:Application= express();
app.use(express.json());
dotenv.config();
app.use('/',Routerindex);


// Port
app.listen(3008, () => console.log("Server Started"));