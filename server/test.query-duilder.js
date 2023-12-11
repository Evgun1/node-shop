const db = require('./db');

async function start() {
    const pg = db.open({
        host: 'localhost',
        port: 5432,
        database: 'node-shop',
        user: 'postgres',
        password: 'EvgexaZR123',
    });

    await pg.client.connect();

    const resultQuery = await pg.query(`SELECT * FROM products;`, null);

    pg.select('products')
        .fields(['quantity_per_unit', 'unit_price'])
        .order('quantity_per_unit')
        .then((rows) => console.log(rows));
    console.log(resultQuery);
}
start();
