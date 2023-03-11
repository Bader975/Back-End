import * as jwt from "jsonwebtoken";

import  express,{Application} from "express";
import  RouterUser  from "./routes/user.route";
import  RouterTask  from "./routes/task.route";
import * as dotenv from "dotenv";


const app:Application= express();
app.use(express.json());
dotenv.config();


app.use('/',RouterUser);
app.use('/',RouterTask);

// Port
app.listen(3008, () => console.log("Server Started"));