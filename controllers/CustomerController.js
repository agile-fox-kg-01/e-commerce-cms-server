const { Product, Cart } = require('../models/index')

class CustomerController {
    static async browse(req, res, next) {
        try {
            const products = await Product.findAll();
            res.status(200).json(products);
        } catch (error) {
            next(error);
        }
    }
    static async read(req, res, next) {
        try {
            const product = await Product.findByPk(req.params.id)
            if(product === null) {
                next({
                    name: 'NotFound',
                    errors: 'Product not found'
                })
            } else {
                res.status(200).json(product)
            }
        } catch (error) {
            next(error)
        }
    }
    static async addCart(req, res, next) {
        try {
            const product = await Product.findByPk(req.params.id)
            if(product === null) {
                next({
                    name: 'NotFound',
                    errors: 'Product not found'
                })
            } else {
                const cart = {
                    UserId: req.userLogin.id,
                    ProductId: req.params.id
                }
                const result = await Cart.create(cart)
                res.status(201).json(result)
            }
        } catch (error) {
            next(error)
        }
    }
    static async showCart(req, res, next) {
        try {
            const carts = await Cart.findAll({
                include: Product,
                where: {
                    UserId: req.userLogin.id
                }
            })
            res.status(200).json(carts)
        } catch (error) {
            next(error)
        }
    }
    static async deleteCartItem(req, res, next) {
        try {
            await Cart.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({
                message: "Successfully delete item in your cart"
            })
        } catch (error) {
            next(error)
        }
    }
}
module.exports = CustomerController