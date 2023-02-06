import express, { Express } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import compression from "compression";
import AppDataSource from "./database";
import { router } from "./app/router";

dotenv.config();

// initiate datasource
AppDataSource.initialize();

// initiate express
const app: Express = express();

// declare middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(morgan("dev"));
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Accept", "Authorization"],
  credentials: true
}));
app.use(compression({ level: 1 }));

// declare main routes
app.use(router);

app.listen(process.env.PORT || 3000, () => console.log("Server is running"));