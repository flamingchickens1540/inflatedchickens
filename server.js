import { express } from 'express';
import { createServer } from 'http';
import { handler } from './build/handler.js';
import injectSocketIO from './ws';

const app = express();
const server = createServer(app);
const port = 3022;

const io = injectSocketIO(server);

app.use(handler);

app.listen(port, () => {
	console.log(`WS Server Listening On Port ${port}`);
});

export const getServer = () => io;
