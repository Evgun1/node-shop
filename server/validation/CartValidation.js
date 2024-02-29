const Validation = require('./Validation');

class CartValidation extends Validation {
    saveCart(request, response, next) {
        const { curentProduct, userToken } = request.body;
        if (curentProduct) {
            next(request, response, next);
        }
        response.status(400);
        response.send('Sended Empty Cart');
    }
}

module.exports = new CartValidation();
