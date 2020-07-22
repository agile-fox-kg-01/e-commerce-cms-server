const { Product } = require('../models/index');

class ProductController {
    static async getProductRootHandler(req, res, next) {
        try {
            const products = await Product.findAll();

            res.status(200).json(products);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async postProductRootHandler(req, res, next) {
        const objProduct = {
            name: req.body.name,
            imageURL: req.body.imageURL,
            price: Number(req.body.price) === 0 ? '' : Number(req.body.price),
            stock: Number(req.body.stock) === 0 ? '' : req.body.stock
        }

        console.log(objProduct);

        try {
            const newProduct = await Product.create(objProduct);

            res.status(201).json(newProduct);
        } catch (error) {
            next(error);
        }
    }

    static async getProductByIdHandler(req, res, next) {
        const productId = req.params.id;

        try {
            const product = await Product.findByPk(productId);

            if(!product) {
                next({
                    name: '404 Not Found',
                    error: {message: 'Product not found'}
                });
            } else {
                res.status(200).json(product);
            }
        } catch (error) {
            next(error);
        }
    }

    static async putProductByIdHandler(req, res, next) {
        const productId = req.params.id;
        const objProduct = {
            name: req.body.name,
            imageURL: req.body.imageURL,
            price: req.body.price,
            stock: req.body.stock
        }

        try {
            const product = await Product.update(objProduct, {
                returning: true,
                where: {
                    id: productId
                }
            });

            if(product[0] !== 1) {
                next({
                    name: '404 Not Found',
                    error: {message: 'Product not found'}
                });
            } else {
                const result = product[1];
                const updatedData = result[0];

                res.status(200).json(updatedData);
            }
        } catch (error) {
            next(error);
        }
    }

    static async deleteProductByIdHandler(req, res, next) {
        const productId = req.params.id;
        try {
            const productData = await Product.findByPk(productId);
            const product = await Product.destroy({
                where: {
                    id: productId
                }
            });

            if(product !== 1) {
                next({
                    name: '404 Not Found',
                    error: {message: 'Product not found'}
                });
            } else {
                res.status(200).json(productData);
            }

        } catch (error) {
            next(error);
        }
    }
}

module.exports = ProductController;