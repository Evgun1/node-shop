const pgClient = require('../pgClient');
const createCategories = require('./faker/categories');
const createSuppliers = require('./faker/suppliers');
const createProducts = require('./faker/product');

async function start() {
    await pgClient.connect();
    createCategories();
    createSuppliers();
    createProducts();
}

start();
