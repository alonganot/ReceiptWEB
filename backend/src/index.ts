// src/index.ts
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import cors from 'cors'
import sessionsRouter from './routes/sessions'
import bodyParser from "body-parser";

const app: Express = express();
const port = 3000;

app.use(cors())

app.use(bodyParser.json())

app.use('/sessions', sessionsRouter)

app.get("/isAlive", (req: Request, res: Response) => {
  res.send("App is running");
});

app.listen(port, async () => {
  await mongoose.connect(`mongodb+srv://alonga:password12321@alonga.zyoscl0.mongodb.net/${process.env.NODE_ENV=== 'development' ? "Receipt" : "Receipt"}`);
  console.log(`[server]: Server and DB are running`);
});