const db = require('../db');
const { pgClient } = require('./Products.controller');

class CartController {
    async getAll(req, res, next) {
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
    /**
     *
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async getUserCart(req, res) {
        const userToken = req.params.userToken;
        const cursor = db.select('cart');
        const where = {};

        if (userToken) where.user_token = `*${userToken}`;

        cursor.where(where);
        try {
            const cartArr = await cursor.query();
            res.send(cartArr);
        } catch (error) {
            res.status(500);
            res.send(error.message);
        }
    }

    /**
     *
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async saveCart(req, res, next) {
        const { curentProduct, userToken } = req.body;
        if (!curentProduct) {
            res.status(400);
            res.send('Sended Empty Cart');
        }

        await db.query(
            `
            INSERT INTO cart (user_token, item_amount, product_id)
            VALUES('${userToken}', ${curentProduct.amount}, ${curentProduct.productID})
                `
        );
        res.send({ text: 'yes' });
    }
    /**
     *
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async updateCart(req, res) {
        const { curentProduct, userToken } = req.body;
        if (!curentProduct) {
            res.status(400);
            res.send('Sended Empty Cart');
        }
        await db.query(
            `UPDATE cart SET item_amount = $2 WHERE user_token = $1 AND product_id = $3`,
            [userToken, curentProduct.amount, curentProduct.productID]
        );
        res.send('update');
    }
    
    async deleteCart(req, res) {
        const { productID, userToken } = req.body;
        if (!productID) {
            res.status(400);
            res.send('Feiled Deletet');
        }
        await db.query(
            `
            DELETE FROM cart WHERE product_id = $1 AND user_token = $2
            `,
            [productID, userToken]
        );
        req.send('Delete');
    }
}

module.exports = new CartController();
