const { Client } = require('pg');

const config = {
    host: 'localhost',
    port: 5432,
    database: 'node-shop',
    user: 'postgres',
    password: 'postgres',
};

const client = new Client(config);
module.exports = client;
