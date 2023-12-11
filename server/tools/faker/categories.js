const { faker } = require('@faker-js/faker');
const pgClient = require('../../pgClient');

function createCategories() {
    for (let index = 0; index < 100; index++) {
        const element = {
            category_name: faker.commerce.department(),
            discription: faker.commerce.productDescription(),
        };

        pgClient.query(
            `
            INSERT INTO categories (category_name, discription)
            VALUES ($1, $2)
            `,
            [element.category_name, element.discription]
        );
    }
}

module.exports = createCategories;
