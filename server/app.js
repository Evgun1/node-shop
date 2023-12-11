const express = require('express');
const pgClient = require('./pgClient');
const router = require('./routes/index');

async function start() {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(router);

    await pgClient.connect();
    app.listen(5000, () => {
        console.log('Server was started');
    });
}

start();
