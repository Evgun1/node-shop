const AppBaseController = require('./AppBaseController');
const pgClient = require('../pgClient');

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
        try {
            const result = await pgClient.query(
                `SELECT * FROM products LIMIT 10`
            );
            const productsArr = result.rows;
            res.send({ productsArr });
        } catch (error) {
            console.log(error);
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
