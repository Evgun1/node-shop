const { query } = require('express');
const pgClient = require('../pgClient');
const AppBaseController = require('./AppBaseController');

class CategoryController extends AppBaseController {
    constructor() {
        super();
    }

    /**
     *
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {*} next
     */
    async get(req, res, next) {
        const urlParams = req.query;

        console.log(urlParams);

        let sqlQuery = `
        SELECT * FROM categories
        `;
        if (urlParams.limit) {
            sqlQuery += ` LIMIT ${urlParams.limit}`
        }

        try {
            const result = await pgClient.query(sqlQuery);
            const categoriesAll = result.rows;
            res.send(categoriesAll);
        } catch (error) {
            console.log(error);
        }
    }

    async create(req, res, next) {
        const body = req.body;
        try {
            const result = await pgClient.query(
                `
                INSERT INTO categories (category_name, discription)
                VALUES ($1, $2)
                `,
                [body.category_name, body.discription]
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
                UPDATE categories
                SET category_name = $2, discription = $3
                WHERE category_id = $1
                `,
                [
                    parseInt(body.category_id),
                    body.category_name,
                    body.discription,
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
                DELETE FROM categories WHERE category_id = $1
                `,
                [parseInt(body.category_id)]
            );
            console.log(result);
            res.send('delete');
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new CategoryController();
