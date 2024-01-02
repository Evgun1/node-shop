const pgClient = require('../pgClient');
const db = require('../db');
const AppBaseController = require('./AppBaseController');

class SuppliersController extends AppBaseController {
    constructor() {
        super();
    }
    async getAll(req, res, next) {
        const urlParams = req.query;
        const cursor = db.select('suppliers');
        const where = {};

        console.log(urlParams);
        if (urlParams.order) cursor.order(urlParams.order);
        if (urlParams.fields) cursor.fields(urlParams.fields.split(','));
        if (urlParams.company_name)
            where.company_name = `*${urlParams.company_name}`;
        if (urlParams.contact_name)
            where.contact_name = `*${urlParams.contact_name}`;
        if (urlParams.contact_title)
            where.contact_title = `*${urlParams.contact_title}`;
        if (urlParams.suppliers_addres)
            where.suppliers_addres = `*${urlParams.suppliers_addres}`;
        if (urlParams.city) where.city = `*${urlParams.city}`;
        if (urlParams.region) where.region = `*${urlParams.region}`;
        if (urlParams.postal_code)
            where.postal_code = `*${urlParams.postal_code}`;
        if (urlParams.country) where.country = `*${urlParams.country}`;
        if (urlParams.phone) where.phone = `*${urlParams.phone}`;
        if (urlParams.fax) where.fax = `*${urlParams.fax}`;
        if (urlParams.homepage) where.homepage = `*${urlParams.homepage}`;

        try {
            const suppliersAll = await cursor.query();
            res.send(suppliersAll);
        } catch (error) {
            console.log(error);
        }
    }

    async getSupplierId(req, res, next) {
        const supplierID = req.params.supplierID;
        const cursor = db
            .select('suppliers')
            .where({ supplier_id: supplierID });

        if (req.query.fields && req.query.fields.length)
            cursor.fields(req.query.fields.split(','));
        try {
            const result = await cursor.query();
            res.send(result[0]);
        } catch (error) {
            res.status(500);
            res.send(error.message);
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
