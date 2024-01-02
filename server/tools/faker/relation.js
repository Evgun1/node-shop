/** TO DO:
 * 1. узяти всы сатегорыъ, проудкти ы суплаери з бд
 * 2. запустити цткл(перебрати) по усих продуктах з бд
 * 3. узяти рандомну категорыъ з категорый ы те маие з суплаэрыв
 *
 * */

const pgClient = require('../../pgClient');

const relation = async (req, res) => {
    const productALL = await pgClient.query(
        `
        SELECT product_id FROM products;
        `
    );
    const categoryAll = await pgClient.query(
        `
        SELECT category_id FROM categories
        `
    );
    const supplierAll = await pgClient.query(
        `
        SELECT supplier_id FROM suppliers 
        `
    );

    productALL.rows.forEach((item) => {
        const categotyIndex = Math.floor(
            Math.random() * categoryAll.rows.length
        );
        const supplierIndex = Math.floor(
            Math.random() * supplierAll.rows.length
        );

        const randomCategoty = parseInt(
            categoryAll.rows[categotyIndex].category_id
        );

        const randomSupplier = parseInt(
            supplierAll.rows[supplierIndex].supplier_id
        );

        console.table({
            productID: item.product_id,
            categotyIndex,
            supplierIndex,
            randomCategoty,
            randomSupplier,
        });

        pgClient.query(
            `UPDATE products SET category_id = $1, supplier_id = $2  WHERE product_id = $3`,
            [randomCategoty, randomSupplier, item.product_id]
        );
        // console.log(item);
    });

    // console.log(productALL, categoryAll, supplierAll);
};

module.exports = relation;
