const { query } = require('express');
const pgClient = require('../pgClient');
const AppBaseController = require('./AppBaseController');
const db = require('../db');

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

        const cursor = db.select('categories');

        if (urlParams.order) cursor.order(urlParams.order);
        if (urlParams.fields) cursor.fields(urlParams.fields.split(','));
        const where = {};

        if (urlParams.category_name)
            where.category_name = `*${urlParams.category_name}`;
        if (urlParams.discription)
            where.discription = `*${urlParams.discription}`;

        cursor.where(where);
        try {
            const result = await cursor.query();
            res.send(result);
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    async getCategoryId(req, res, next) {
        const categoryID = req.params.categoryID;
        const cursor = db
            .select('categories')
            .where({ category_id: categoryID });

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

    /**
     *
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {*} next
     */
    async create(req, res, next) {
        const body = req.body;
        const category_name =
            body.category_name && body.category_name.length
                ? body.category_name
                : null;
        if (category_name) {
            res.status(500);
            res.send('Category name should not be empty!');
        }
        try {
            const result = await pgClient.query(
                `
                INSERT INTO categories (category_name, discription)
                VALUES ($1, $2)
                `,
                [category_name, body.discription]
            );
            console.log(result);
            res.send('create');
        } catch (error) {
            res.status(500);
            res.send(error.message);
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
