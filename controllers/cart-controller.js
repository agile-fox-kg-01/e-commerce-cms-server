const { Cart, CartProduct, Product } = require('../models/index');

class CartController {
    static async getCartRootHandler(req, res, next) {
        const userId = req.loggedInUser.id;

        try {
            const cart = await Cart.findOne({
                include: [
                    {
                        model: CartProduct,
                        where: {
                            status: 'In Cart'
                        },
                        include: [
                            {
                                model: Product
                            }
                        ]
                    }
                ],
                where: {
                    UserId: userId
                }
            });

            res.status(200).json(cart);
        } catch (error) {
            next(error);
        }
    }

    static async postCartRootHandler(req, res, next) {
        const userId = req.loggedInUser.id;
        let products = req.body.products;
        console.log(products);
        // products = products.map(elem => {
        //     return JSON.parse(elem);
        // })
        
        try {
            const cart = await Cart.findOne({
                where: {
                    UserId: userId
                }
            });
            if(!cart) {
                next({
                    name: '404 Not Found',
                    error: {message: 'Cart not found'}
                });
            } else {
                const cartProducts = await CartProduct.findAll({
                    where: {
                        CartId: cart.id,
                        status: 'In Cart'
                    }
                });
                
                let cartProduct = products.forEach(async (elem) => {
                                    let newCartProduct = {
                                        CartId: cart.id,
                                        ProductId: elem.ProductId,
                                        quantity: elem.quantity
                                    }
                                    let isContain = false;
                                    let cartId;
                                    let productId;
                                    for(let i = 0; i < cartProducts.length; i++) {
                                        if(elem.ProductId === cartProducts[i].dataValues.ProductId) {
                                            newCartProduct.quantity += cartProducts[i].dataValues.quantity;
                                            cartId = cartProducts[i].dataValues.CartId;
                                            productId = cartProducts[i].dataValues.ProductId;
                                            isContain = true;
                                        }
                                    }
                                    
                                    isContain ? await CartProduct.update(newCartProduct, {where: {CartId: cartId, ProductId: productId}}) : await CartProduct.create(newCartProduct);
                                });
    
                
                res.status(200).json({message: 'The product is added successfully'});   
            }
            
        } catch (error) {
            next(error);
        }
    }

    static async putCartProductRootHandler(req, res, next) {
        const productId = req.params.productId;
        const userId = req.loggedInUser.id;

        try {
            const cart = await Cart.findOne({
                where: {
                    UserId: userId
                }
            });

            if(!cart) {
                next({
                    name: '404 Not Found',
                    error: {message: 'Cart not found'}
                });
            } else {
                const updatedCartProduct = {
                    status: 'Removed'
                }
                const cartProduct = await CartProduct.update(updatedCartProduct, {
                    where: {
                        ProductId: productId,
                        CartId: cart.id
                    }
                })
    
                res.status(200).json({message: 'Product is removed successfully'});
            }

        } catch (error) {
            
        }
    }
}

module.exports = CartController;