import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import serveFavicon from 'serve-favicon';
import { connectDB } from './configs/db';
import { IErrorObject } from './types/interfaces';
import exampleRoutes from './routes/exampleRoutes';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 4242;

// Serve the favicon
app.use(serveFavicon(path.join(__dirname, '../public', 'favicon.ico')));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Middlewares
// TODO: Add CORS Options when project is done!
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (_req: Request, res: Response) => {
	res.status(200).send({ success: true, message: '🏃 Server is Running!' });
});

// Actual Routes
app.use('/example', exampleRoutes);

// Error Handler for 404
app.use((_req: Request, _res: Response, next: NextFunction) => {
	const error: IErrorObject = new Error('Requested URL Not Found!');
	error.status = 404;
	next(error);
});

// Final/Global Error Handler
app.use(
	(error: IErrorObject, _req: Request, res: Response, _next: NextFunction) => {
		console.error('❌	Error: ' + error.message);
		res.status(error.status || 500).send({
			success: false,
			message: error.message || 'Internal Server Error!',
		});
	},
);

// Connect to DB and Start the Server
const runServer = async () => {
	await connectDB();

	app.listen(port, async () => {
		console.log('🏃	Server is Running on Port: ', port);
	});
};

// Call runServer
runServer().catch(console.dir);

export default app;
