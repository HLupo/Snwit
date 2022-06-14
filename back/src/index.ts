import mongoose from "mongoose";
import express from "express";
import cors from "cors"

import UserRouter from "./routes/UserRouter";
import { IUser, User } from "./models/User"

const app = express();
const port = 8080; // default port to listen

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
    .then((res) =>
        app.listen(port, () => {
            console.log(`server started at http://localhost:${port}`);
        }))
    .catch((err) => console.log(err))


app.use(cors());
app.use(express.json());

app.use("/", UserRouter);