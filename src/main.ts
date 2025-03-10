import express, {Request, Response} from "express";
import * as mongoose from "mongoose";
import {userService} from "./services/user.service";


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const dbConnection = async (): Promise<void> => {
    let dbCon = false;
    while (!dbCon) {
        try {
            console.log('Connecting to db');
            await mongoose.connect('mongodb+srv://Maietskyi:admin@cluster0.8nrw3.mongodb.net/nodejs-express-db');
            dbCon = true;
            console.log('Database available!!!');
        } catch (e) {
            console.log('Database unavailable, wait 3 seconds');
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    }
};

app.get("/", async (req: Request, res: Response) => {
    const data = await userService.getAll();
    res.json(data)
})

const start = async (): Promise<void> => {
    try {
        await dbConnection();
        app.listen(2222, (): void => {
            'Server listening on port 222'
        });
    } catch (e) {
        console.error(e);
    }
};

start();

