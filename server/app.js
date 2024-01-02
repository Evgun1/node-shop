const express = require('express');
const cors = require('cors');
const pgClient = require('./pgClient');
const router = require('./routes/index');
const db = require('./db');

async function start() {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(router);

    await db.client.connect();
    await pgClient.connect();
    app.listen(5000, () => {
        console.log('Server was started');
    });
}

start();
