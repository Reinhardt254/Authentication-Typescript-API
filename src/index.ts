import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors"
import compression from "compression";
import dotnev from "dotenv";
import mongoose from "mongoose";
import router from "./router";

const app = express();

app.use(cors({
   credentials: true,
}))

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

dotnev.config();

const server = http.createServer(app)

server.listen(5000, () => {
   console.log("Server running on http://localhost:5000")
})

const MONGO_URL = process.env.MONGO_URL

mongoose.Promise = Promise
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error)=>console.log(error));

app.use("/", router());
