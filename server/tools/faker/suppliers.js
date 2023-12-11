const { faker } = require('@faker-js/faker');
const pgClient = require('../../pgClient');

function createSuppliers() {
    for (let index = 0; index < 50; index++) {
        const element = {
            company_name: faker.company.name(),
            contact_name: faker.person.fullName(),
            contact_title: faker.person.jobTitle(),
            suppliers_addres: faker.location.street(),
            city: faker.location.city(),
            region: faker.location.county(),
            postal_code: faker.location.zipCode(),
            country: faker.location.country(),
            phone: faker.phone.number(),
            homepage: faker.internet.url(),
        };

        if (faker.datatype.boolean()) {
            element.fax = faker.phone.number();
        }
        pgClient.query(
            `
            INSERT INTO suppliers (company_name, contact_name, contact_title, suppliers_addres, city, region, postal_code, country, phone, homepage)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            `,
            [
                element.company_name,
                element.contact_name,
                element.contact_title,
                element.suppliers_addres,
                element.city,
                element.region,
                element.postal_code,
                element.country,
                element.phone,
                element.homepage,
            ]
        );
    }
}
module.exports = createSuppliers;
