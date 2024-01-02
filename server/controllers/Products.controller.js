const AppBaseController = require('./AppBaseController');
const pgClient = require('../pgClient');
const db = require('../db');
class ProductController extends AppBaseController {
    constructor() {
        super();
        // console.log(this);
    }
    /**
     *
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {*} next
     */
    async getAll(req, res, next) {
        const urlParams = req.query;
        const cursor = db.select('products');
        // console.log(urlParams);
        const where = {};

        if (urlParams.order) cursor.order(urlParams.order);
        if (urlParams.fields) cursor.fields(urlParams.fields.split(','));

        if (urlParams.quantity_per_unit)
            where.quantity_per_unit = `*${urlParams.quantity_per_unit}`;
        if (urlParams.unit_price) where.unit_price = `*${urlParams.unit_price}`;
        if (urlParams.units_in_stock)
            where.units_in_stock = `*${urlParams.units_in_stock}`;
        if (urlParams.units_on_order)
            where.units_on_order = `*${urlParams.units_on_order}`;
        if (urlParams.reorder_level)
            where.reorder_level = `*${urlParams.reorder_level}`;
        if (urlParams.discontinued)
            where.discontinued = `*${urlParams.discontinued}`;

        if (urlParams.ids) {
            where.product_id = {
                operator: '= ANY',
                // value: urlParams.ids,
                value: urlParams.ids.split(',').map((item) => parseInt(item)),
            };
        }

        // if (condition) {
        // }
        cursor.where(where);
        try {
            const productsArr = await cursor.query();
            res.send(productsArr);
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    /**
     *
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {*} next
     */
    async getProductId(req, res, next) {
        console.log(req.cookies);
        const productID = req.params.productID;
        const cursor = db.select('products');

        cursor.where({ product_id: productID });

        if (req.query.fields && req.query.fields.length)
            cursor.fields(req.query.fields.split(','));

        try {
            const product = await cursor.query();
            res.send(product[0]);
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    /**
     *
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {*} next
     */
    async create(req, res, next) {
        const body = req.body;
        console.log(body);
        try {
            const result = await pgClient.query(
                `
            INSERT INTO products (quantity_per_unit, unit_price, units_in_stock, units_on_order, reorder_level, discontinued)
            VALUES ($1, $2, $3, $4, $5, $6)
            `,
                [
                    parseInt(body.quantity_per_unit),
                    parseInt(body.unit_price),
                    parseInt(body.units_in_stock),
                    parseInt(body.units_on_order),
                    parseInt(body.reorder_level),
                    parseInt(body.discontinued),
                ]
            );
            console.log(result);
            res.send('created');
        } catch (error) {
            console.log(error);
        }
    }

    async change(req, res, next) {
        const body = req.body;
        try {
            const result = await pgClient.query(
                `
                UPDATE products 
                SET quantity_per_unit = $2, unit_price = $3, units_in_stock = $4, units_on_order = $5, reorder_level = $6, discontinued = $7 
                WHERE product_id = $1
                `,
                [
                    parseInt(body.product_id),
                    parseInt(body.quantity_per_unit),
                    parseInt(body.unit_price),
                    parseInt(body.units_in_stock),
                    parseInt(body.units_on_order),
                    parseInt(body.reorder_level),
                    parseInt(body.discontinued),
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
        console.log(parseInt(body.product_id));
        try {
            const result = await pgClient.query(
                `
                DELETE FROM products WHERE product_id = $1`,
                [parseInt(body.product_id)]
            );
            console.log(result);
            res.send('delete');
        } catch (error) {
            console.log(error);
            res.send('error');
        }
    }
}

module.exports = new ProductController();
