const { faker } = require('@faker-js/faker');
const pgClient = require('../../pgClient');

function createProducts() {
    for (let index = 0; index < 1001; index++) {
        const element = {
            quantity_per_unit: faker.number.int({ min: 1, max: 100 }),
            unit_price: faker.number.int({ min: 1, max: 2000 }),
            units_in_stock: faker.number.int({ min: 0, max: 100 }),
            units_on_order: faker.number.int({ min: 0, max: 100 }),
            reorder_level: faker.number.int({ min: 0, max: 10 }),
            discontinued: faker.number.int({ min: 0, max: 99 }),
        };

        pgClient.query(
            `
            INSERT INTO products (quantity_per_unit, unit_price, units_in_stock, units_on_order, reorder_level, discontinued)
            VALUES ($1, $2, $3, $4, $5, $6)
            `,
            [
                element.quantity_per_unit,
                element.unit_price,
                element.units_in_stock,
                element.units_on_order,
                element.reorder_level,
                element.discontinued,
            ]
        );
    }
}

module.exports = createProducts;
