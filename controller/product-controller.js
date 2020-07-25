const { Product } = require('../models/index.js')

class ProductController {
    static async create(req, res, next) {
        const { name, image_url, price, stock } = req.body

        try {
            let newProduct = await Product.create({
                name,
                image_url,
                price,
                stock
            })

            if (newProduct) {
                res.status(201).json(newProduct)
            }
        } catch (error) {
            next(error)
        }

    }

    static async read(req, res, next) {
        try {
            let allProduct = await Product.findAll()
            res.status(200).json(allProduct)
        } catch (error) {
            next(error)
        }
    }

    static async update(req, res, next) {
        const productId = req.params.id
        const { name, image_url, price, stock } = req.body

        try {
            let updateProduct = await Product.update({
                name,
                image_url,
                price,
                stock
            },
                {
                    where: {
                        id: productId
                    },
                    returning: true
                }
            )

            if (updateProduct[0] == 1) {
                const [status, newProduct] = updateProduct
                res.status(200).json(newProduct[0])
            } else {
                throw ({ name: "Not Found" })
            }
        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next) {
        const productId = req.params.id

        try {
            let deletedProduct = await Product.destroy({
                where: {
                    id: productId
                },
                returning: true
            })

            if (deletedProduct) {
                res.status(200).json({message: "product deleted"})
            } else {
                throw ({ name: "Not Found" })
            }
        } catch (error) {
            next(error)
        }
    }

    static async readById(req, res, next) {
        const productId = req.params.id

        try {
            let currentProduct = await Product.findOne({
                where: {
                    id: productId
                }
            })

            if (currentProduct) {
                res.status(200).json(currentProduct)
            } else {
                throw ({ name: "Not Found" })
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ProductController