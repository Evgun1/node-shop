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
        const { products, userToken } = req.body;
        if (!products || !products.length) {
            res.status(400);
            res.send('Sended Empty Cart');
        }

        for await (const product of products) {
            console.log(product, userToken);
            // const query = `UPDATE cart SET item_amount=${product.amount} WHERE user_token='${userToken}' AND product_id=${product.productID}; INSERT INTO cart (user_token, item_amount, product_id) VALUES('${userToken}', ${product.amount}, ${product.productID})`;
            const value = [userToken, product.amount, product.productID];
            // await db.query(
            //     `UPDATE cart SET item_amount=${product.amount} WHERE user_token='${userToken}' AND product_id=${product.productID}`
            //     // value
            // );
            // await db.query(
            //     `INSERT INTO cart (user_token, item_amount, product_id) VALUES('${userToken}', ${product.amount}, ${product.productID})
            //     SELECT '${userToken}', ${product.amount}, ${product.productID}
            //     WHERE NOT EXISTS (SELECT * FROM cart WHERE user_token='${userToken}' AND product_id=${product.productID});`
            //     // value
            // );

            await db.query(
                `
                DELETE FROM cart WHERE product_id = ${product.productID} AND user_token='${userToken}'; 
                
                INSERT INTO cart (user_token, item_amount, product_id)
                VALUES('${userToken}', ${product.amount}, ${product.productID})
            `
            );
        }
        res.send({ text: 'yes' });
    }
}

module.exports = new CartController();
