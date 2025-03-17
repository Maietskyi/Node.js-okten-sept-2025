/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response, NextFunction } from "express";
import * as mongoose from "mongoose";
import { config } from "./configs/config";
import { apiRouter } from "./routers/api.router";
import { ApiError } from "./errors/api.error";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbConnection = async (): Promise<void> => {
    let dbCon = false;
    while (!dbCon) {
        try {
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

app.use("/", apiRouter);

app.use(
    "*",
    (err: ApiError, req: Request, res: Response, next: NextFunction) => {
        const status = err.status || 500;
        const message = err.message ?? "Server Error";
        res.status(status).json({ status, message });
    },
);
process.on("uncaughtException", (err) => {
    console.error("uncaughtException", err);
    process.exit(1);
});
const start = async (): Promise<void> => {
    try {
        await dbConnection();
        app.listen(config.PORT, (): void => {
            console.log(`Server listening on port ${config.PORT}`);
        });
    } catch (e) {
        console.error(e);
        await new Promise((resolve) => setTimeout(resolve, 3000));
    }
};

start();
