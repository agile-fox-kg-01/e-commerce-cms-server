const express = require('express');
const app = express()

// Login
const { comparePassword } = require('./helpers/bcrypt')
const { signToken } = require('./helpers/jwt')

const { Product, User } = require('./models/index');

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/products', async function(req, res, next) {
    try {
        const product = await Product.findAll()
        res.json(product)
    } catch (err) {
        next(err)
    }
})

app.post('/products', async function (req, res, next) {
    const { name, image_url, price, stock } = req.body

    try {
        const newProduct = await Product.create({ name, image_url, price, stock })

        res.status(201).json(newProduct)
    } catch (err) {
        next(err)
    }
})
app.delete('/products/:id', async function (req, res, next) {
    try {
        const product = await Product.findByPk(req.params.id)
        if (!product) {
            throw { name: 'Not Found'}
        } else {
            await Product.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({
                message: "Deleted"
            })
        }

    } catch (err) {
        next(err)
    }
})
app.patch('/products/:id', async function (req, res, next) {
    try {
        const product = await Product.findByPk(req.params.id)
        if (!product) {
            throw { name: 'Not Found' }
        } else {
            const updateProduct = await Product.update({ name: req.body.name, image_url: req.body.image_url, price: req.body.price, stock: req.body.stock }, {
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({
                message: 'Update Success'
            })
        }
    } catch (err) {
        // console.log(err)
        next(err)
    }
})

app.post('/users/login', async function (req, res, next) {
     
    const inputPassword = req.body.password
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        const databasePassword = user ? user.password : ''
        if (!user) {
            throw { name: "Invalid email and password" }
        } else if (!comparePassword(inputPassword, databasePassword)) {
            throw { name: "Invalid email and password" }
        } else {
            const payload = {
                email: user.email
            }
            const token = signToken(payload)
            res.status(200).json({
                token
            })
        }
    } catch (err) {
        next(err)
    }
})

app.use(function (err, req, res, next) {
    // console.log(err);

    if (err.name === "SequelizeValidationError") {
        const errors = err.errors.map(error => ({
            message: error.message
        }));
        res.status(400).json({
            errors
        })
    } else if (err.name === "Invalid email and password") {
        res.status(400).json({
            message: 'Invalid email and password'
        })
    } else if (err.name === "Not Found") {
        res.status(404).json({
            message: 'Cant update/delete, because Product not found'
        })
    }else {
        res.status(500).json({
            errors: [{ message: 'internal server error'}]
        }) 
    }

})

module.exports = app


