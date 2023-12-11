const pgClient = require('../pgClient');

const AppBaseController = require('./AppBaseController');

class SuppliersController extends AppBaseController {
    constructor() {
        super();
    }
    async get(req, res, next) {
        const body = req.body;
        try {
            const result = await pgClient.query(
                `
                SELECT * FROM suppliers LIMIT 10
                `
            );
            const suppliersAll = result.rows;
            res.send([suppliersAll]);
        } catch (error) {
            console.log(error);
        }
    }

    async create(req, res, next) {
        const body = req.body;
        try {
            const result = await pgClient.query(
                `
                INSERT INTO suppliers (company_name, contact_name, contact_title, suppliers_addres, city, region, postal_code, country, phone, fax, homepage)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                `,
                [
                    body.company_name,
                    body.contact_name,
                    body.contact_title,
                    body.suppliers_addres,
                    body.city,
                    body.region,
                    body.postal_code,
                    body.country,
                    body.phone,
                    body.fax,
                    body.homepage,
                ]
            );
            console.log(result);
            res.send('create');
        } catch (error) {
            console.log(error);
        }
    }

    async change(req, res, next) {
        const body = req.body;
        try {
            const result = await pgClient.query(
                `
                UPDATE suppliers
                SET company_name = $2, contact_name = $3, contact_title = $4, suppliers_addres = $5, city = $6, region = $7, postal_code = $8, country = $9, phone = $10, fax = $11, homepage = $12
                WHERE supplier_id = $1
                `,
                [
                    parseInt(body.supplier_id),
                    body.company_name,
                    body.contact_name,
                    body.contact_title,
                    body.suppliers_addres,
                    body.city,
                    body.region,
                    body.postal_code,
                    body.country,
                    body.phone,
                    body.fax,
                    body.homepage,
                ]
            );
            console.log(result);
            res.send('change');
        } catch (error) {
            console.log(error);
        }
    }

    async delete(req, res, next) {
        const body = req.body;
        try {
            const result = await pgClient.query(
                `
                DELETE FROM suppliers WHERE supplier_id = $1
                `,
                [parseInt(body.supplier_id)]
            );
            console.log(result);
            res.send('delete');
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new SuppliersController();
