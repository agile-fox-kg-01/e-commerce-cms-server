const { AccessGroup, Cart, Product, User } = require('../models/index');
const { verifyToken } = require('../helpers/jwt');

const authentication = async (req, res, next) => {
    const token = req.headers.access_token;
    
    if(!token) {
        next({
            name: '401 Unauthorized',
            error: {message: 'You have to logged in'}
        });
    } else {
        const payload = verifyToken(token);

        try {
            const user = await User.findOne({
                include: AccessGroup,
                where: {
                    email: payload.email
                }
            });
            
            if(!user) {
                next({
                    name: '401 Unauthorized',
                    error: {message: 'You have to logged in'}
                });
            } else {
                req.loggedInUser = user;
                
                next();
            }
        } catch (error) {
            next(error);
        }
    }
}

const admin = (req, res, next) => {
    if(req.loggedInUser.AccessGroup.name !== 'Admin') {
        next({
            name: '403 Forbidden',
            errors: {message: `You don't have permission to access`}
        });
    } else {
        next();
    }
}

const cartAuthorization = async (req, res, next) => {
    if(req.loggedInUser.AccessGroup.name !== 'User') {
        next({
            name: '403 Forbidden',
            errors: {message: `You don't have permission to access`}
        });
    } else {
        const userId = req.loggedInUser.id
        try {
            const cart = await Cart.findOne({
                where: {
                    UserId: userId
                }
            });

            if(!cart) {
                next({
                    name: '403 Forbidden',
                    errors: {message: `You don't have permission to access`}
                });     
            } else {
                next();
            }
        } catch (error) {
            next(error);
        }
    }
}

// This function currently unused
const authorization = async (req, res, next) => {
    const productId = Number(req.params.id);

    try {
        const product = await Product.findByPk(productId);

        if(!product) {
            next({
                name: '404 Not Found',
                error: {message: 'Product not found'}
            });
        } else {
            if(req.loggedInUser.AccessGroup.name !== 'Admin') {
                next({
                    name: '403 Forbidden',
                    errors: {message: `You don't have permission to access`}
                });
            } else {
                next();
            }
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {authentication, authorization, admin, cartAuthorization};