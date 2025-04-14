/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";
import cors from "cors";
import { config } from "./configs/config";
import { apiRouter } from "./routers/api.router";
import { ApiError } from "./errors/api.error";
import path from "node:path";
import { cronRunner } from "./crons";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: [
        "http://localhost:3000",
    ],
}));

app.use("/media", express.static(path.join(process.cwd(), "upload")));

app.use("/", apiRouter);

app.use(
    "*",
    (err: ApiError, req: Request, res: Response, next: NextFunction) => {
        const status = err.status || 500;
        const message = err.message ?? "Server Error, Something went wrong";
        res.status(status).json({ status, message });
    },
);

process.on("uncaughtException", (err) => {
    console.error("uncaughtException", err);
    process.exit(1);
});

const dbConnection = async (): Promise<void> => {
    let dbCon = false;
    while (!dbCon) {
        try {
            console.log(config.MONGODB_URI, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            console.log("Connecting to DB...");
            await mongoose.connect(config.MONGODB_URI);
            dbCon = true;
            console.log("Database available!!!");
            /* eslint-disable no-console */
        } catch (e) {
            console.log("Database unavailable, wait 3 seconds");
            await new Promise((resolve) => setTimeout(resolve, 3000));
        }
    }
};

const start = async (): Promise<void> => {
    try {
        await dbConnection();
        app.listen(config.PORT, async (): Promise<void> => {
            console.log(`Server listening on port ${config.PORT}`);
            await cronRunner();
        });
    } catch (e) {
        console.error(e);
    }
};

start();
