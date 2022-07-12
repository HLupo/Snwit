import mongoose from "mongoose";
import express from "express";
import cors from "cors"

import UserRouter from "./routes/UserRouter";
import PostRouter from "./routes/PostRouter"
import NftRouter from "./routes/NftRouter"

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
app.use("/", PostRouter);
app.use("/", NftRouter);