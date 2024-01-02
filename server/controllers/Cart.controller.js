const db = require('../db');
const { pgClient } = require('./Products.controller');

class CartController {
    constructor() {
        super();
    }

    async get(req, res, next) {
        const urlParams = req.query;
        const cursor = db.select('cart');
        const where = {};
        // console.log(urlParams);
        if (urlParams.order) cursor.order(urlParams.order);
        if (urlParams.fields) cursor.fields(urlParams.fields.split(','));

        if (urlParams.user_token) where.user_token = `*${urlParams.user_token}`;
        if (urlParams.item_amount)
            where.item_amount = `*${urlParams.item_amount}`;

        cursor.where(where);
        try {
            const cartArr = await cursor.query();
            res.send(cartArr);
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }
    async post(req, res, next) {
        const body = req.body;

        try {
            const result = await pgClient.query(
                `
                INSERT INTO (user_token, item_amount)
                VALUES($1, $2)
                `,
                [body.user_token, parseInt(body.item_amount)]
            );
            res.send(result);
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }
}

module.exports = new CartController();
