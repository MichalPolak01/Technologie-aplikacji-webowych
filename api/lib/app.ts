import express from 'express';
import { config } from './config';
import Controller from './interfaces/controller.interface';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { logger } from "./middlewares/logger.middleware"
import cors from 'cors';

class App {
    public app: express.Application;

    constructor(controllers: Controller[]) {
        this.app = express();

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.connectToDatabase();
    }

    private async connectToDatabase(): Promise<void> {
        try {
            await mongoose.connect(config.databaseUrl);
            console.log('Connection with database established.');
        } catch (error) {
            console.error('Error connecting to MongoDB: ', error);
        }

        mongoose.connection.on('error', (error) => {
            console.error('MongoDB connection error: ', error);
        });

        mongoose.connection.on('disconected', () => {
            console.log('MongoDB disconected.');
        });

        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed due to app termination.');
            process.exit(0);
        });

        process.on('SIGTERM', async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed due to app termination.');
            process.exit(0);
        });
    }

    corsOptions = {
        origin: 'http://localhost:4200',
        optionsSuccessStatus: 200,
        credentials: true
    };

    private initializeMiddlewares(): void {
        this.app.use(bodyParser.json());
        // this.app.use(morgan('dev'));
        this.app.use(logger);
        this.app.use(cors(this.corsOptions));
    }

    private initializeControllers(controllers: Controller[]): void {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    public listen(): void {
        this.app.listen(config.port, () => {
            console.log(`App listening on the port ${config.port}`);
        });
    }
}

export default App;