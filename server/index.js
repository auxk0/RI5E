import http from 'http';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import { WebSocketServer } from 'ws';
import Ticker from './service/ticker/index.js'

dotenv.config();
const mongo_url = process.env.MONGO_URL;
mongoose.connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    const server = http.createServer();
    const socketServer = new WebSocketServer({ server });
    socketServer.on('connection', ws => {
        console.log('new connection')
        ws.on('message', async msg => {
            console.log(msg.toString())
            const tick = new Ticker(ws, msg.toString(), { slow: 50, fast: 20 });
            await tick.start();
        })
        ws.send('connected');
    });
    server.listen(9000, () => console.log(`Server started at 9000!`));
}).catch((err) => console.log(`Failed to start: ${err}`));