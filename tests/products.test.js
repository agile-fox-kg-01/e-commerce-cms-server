'use strict';

const { AccessGroup, User } = require('../models/index');
const request = require('supertest');
const app = require('../app');
const clearProduct = require('./helpers/clear-product');
const { signToken } = require('../helpers/jwt');

const admin = {
    email: 'admintes@admin.com',
    password: '12345'
};

const user = {
    email: 'usertes@user.com',
    password: '12345'
};

let access_token = '';
let productId;
afterAll(clearProduct);

beforeAll((done) => {
    request(app)
        .post('/login')
        .send(admin)
        .end((err, res) => {
            if(err) {
                done(err);
            } else {
                access_token = res.body.access_token;
                done();
            }
        })
});


const product = {
    name: 'Apple MacBook Pro MXK52ID/A [1.4GHz Intel Core i5/ 8GB RAM/ 512GB SSD/ Intel Iris Plus Graphics/ 13 Inch/ macOS]',
    imageURL: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//100/MTA-7473574/apple_apple_macbook_pro_mxk32_space_grey_-13_inch-_intel_iris_plus_graphics-_2-0ghz_intel_core_i5-_16gb_ram-_512gb_ssd-_macos-_full03_j8bompaz.jpg?output-format=webp',
    price: 32740000,
    stock: 10
}


// POST /product
describe('Create a new product', () => {
    test('System successfully created a new product', (done) => {
        request(app)
            .post('/product')
            .set('access_token', access_token)
            .send(product)
            .end((err, res) => {
                if(err) {
                    throw err;
                } else {
                    expect(res.status).toBe(201);
                    expect(res.body).toBeInstanceOf(Object);
                    expect(res.body).toHaveProperty("id", expect.any(Number));
                    expect(res.body).toHaveProperty("name", "Apple MacBook Pro MXK52ID/A [1.4GHz Intel Core i5/ 8GB RAM/ 512GB SSD/ Intel Iris Plus Graphics/ 13 Inch/ macOS]");
                    expect(res.body).toHaveProperty("imageURL", "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//100/MTA-7473574/apple_apple_macbook_pro_mxk32_space_grey_-13_inch-_intel_iris_plus_graphics-_2-0ghz_intel_core_i5-_16gb_ram-_512gb_ssd-_macos-_full03_j8bompaz.jpg?output-format=webp");
                    expect(res.body).toHaveProperty("price", 32740000);
                    expect(res.body).toHaveProperty("stock", 10);
                    expect(res.body.price).not.toBeNaN();
                    expect(res.body.price).toBeGreaterThan(0);
                    expect(res.body.stock).not.toBeNaN();
                    expect(res.body.stock).toBeGreaterThan(0);
                    productId = res.body.id;
                    
                    done();
                }
            })
    })

    test('System should return create a new product error validation', (done) => {
        request(app)
            .post('/product')
            .set('access_token', access_token)
            .set('Authorization', `Bearer ${access_token}`)
            .send({name: '', imageURL: '', price: '', stock: ''})
            .end((err, res) => {
                if(err) {
                    throw err;
                } else {
                    expect(res.status).toBe(400);
                    expect(res.body).toBeInstanceOf(Object);
                    expect(res.body).toHaveProperty('errors');
                    expect(res.body.errors).toBeInstanceOf(Array);
                    expect(res.body.errors).toContainEqual({message: 'Name is required'});
                    expect(res.body.errors).toContainEqual({message: 'Image URL is required'});
                    expect(res.body.errors).toContainEqual({message: 'Price is required'});
                    expect(res.body.errors).toContainEqual({message: 'Stock is required'});

                    done();
                }
            })
    })
});

// GET /product
describe('Get all products', () => {
    test('System successfully got all products', (done) => {
        request(app)
            .get('/product')
            .set('access_token', access_token)
            .end((err, res) => {
                if(err) {
                    throw err;
                } else {
                    expect(res.status).toBe(200);
                    expect(res.body).toBeInstanceOf(Array);

                    done();
                }
            })
    })
})

// GET /product/:id
describe('Get a product by id', () => {
    test('System successfully got a product by id', (done) => {
        request(app)
            .get(`/product/${productId}`)
            .set('access_token', access_token)
            .end((err, res) => {
                if(err) {
                    throw err;
                } else {
                    expect(res.status).toBe(200);
                    expect(res.body).toBeInstanceOf(Object);

                    done();
                }
            })
    })

    test('System should return product not found', (done) => {
        request(app)
            .get('/product/10000')
            .set('access_token', access_token)
            .end((err, res) => {
                if(err) {
                    throw err;
                } else {
                    expect(res.status).toBe(404);
                    expect(res.body).toBeInstanceOf(Object);
                    expect(res.body).toHaveProperty('error');
                    expect(res.body.error).toBeInstanceOf(Object);
                    expect(res.body.error).toHaveProperty('message', 'Product not found');

                    done();
                }
            })
    })
})

// PUT /product/:id
describe(`Update product's information`, () => {
    test(`System successfully update product's information`, (done) => {
        request(app)
            .put(`/product/${productId}`)
            .set('access_token', access_token)
            .send({name: 'Apple MacBook Pro MXK52ID/A [1.4GHz Intel Core i5/ 8GB RAM/ 512GB SSD/ Intel Iris Plus Graphics/ 13 Inch/ macOS]',
                   imageURL: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//100/MTA-7473574/apple_apple_macbook_pro_mxk32_space_grey_-13_inch-_intel_iris_plus_graphics-_2-0ghz_intel_core_i5-_16gb_ram-_512gb_ssd-_macos-_full03_j8bompaz.jpg?output-format=webp',
                   price: 32000000,
                   stock: 20})
            .end((err, res) => {
                if(err) {
                    throw err;
                } else {
                    expect(res.status).toBe(200);
                    expect(res.body).toBeInstanceOf(Object);
                    expect(res.body).toHaveProperty("id");
                    expect(res.body).toHaveProperty("name", "Apple MacBook Pro MXK52ID/A [1.4GHz Intel Core i5/ 8GB RAM/ 512GB SSD/ Intel Iris Plus Graphics/ 13 Inch/ macOS]");
                    expect(res.body).toHaveProperty("imageURL", "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//100/MTA-7473574/apple_apple_macbook_pro_mxk32_space_grey_-13_inch-_intel_iris_plus_graphics-_2-0ghz_intel_core_i5-_16gb_ram-_512gb_ssd-_macos-_full03_j8bompaz.jpg?output-format=webp");
                    expect(res.body).toHaveProperty("price", 32000000);
                    expect(res.body).toHaveProperty("stock", 20);
                    expect(res.body.id).not.toBeNaN();
                    expect(res.body.price).not.toBeNaN();
                    expect(res.body.price).toBeGreaterThan(0);
                    expect(res.body.stock).not.toBeNaN();
                    expect(res.body.stock).toBeGreaterThan(0);

                    done();
                }
            })
    })

    test('System should return product not found', (done) => {
        request(app)
            .put('/product/10000')
            .set('access_token', access_token)
            .send({name: 'Apple MacBook Pro MXK52ID/A [1.4GHz Intel Core i5/ 8GB RAM/ 512GB SSD/ Intel Iris Plus Graphics/ 13 Inch/ macOS]',
                   imageURL: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//100/MTA-7473574/apple_apple_macbook_pro_mxk32_space_grey_-13_inch-_intel_iris_plus_graphics-_2-0ghz_intel_core_i5-_16gb_ram-_512gb_ssd-_macos-_full03_j8bompaz.jpg?output-format=webp"',
                   price: 32000000,
                   stock: 20})
            .end((err, res) => {
                if(err) {
                    throw err;
                } else {
                    expect(res.status).toBe(404);
                    expect(res.body).toBeInstanceOf(Object);
                    expect(res.body).toHaveProperty('error');
                    expect(res.body.error).toBeInstanceOf(Object);
                    expect(res.body.error).toHaveProperty('message', 'Product not found');

                    done();
                }
            })
    })
})

// DELETE /product/:id
describe('Delete a product', () => {
    test('System successfully deleted a product', (done) => {
        request(app)
            .delete(`/product/${productId}`)
            .set('access_token', access_token)
            .end((err, res) => {
                if(err) {
                    throw err;
                } else {
                    expect(res.status).toBe(200);
                    expect(res.body).toBeInstanceOf(Object);
                    expect(res.body).toHaveProperty("id");
                    expect(res.body).toHaveProperty("name", "Apple MacBook Pro MXK52ID/A [1.4GHz Intel Core i5/ 8GB RAM/ 512GB SSD/ Intel Iris Plus Graphics/ 13 Inch/ macOS]");
                    expect(res.body).toHaveProperty("imageURL", "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//100/MTA-7473574/apple_apple_macbook_pro_mxk32_space_grey_-13_inch-_intel_iris_plus_graphics-_2-0ghz_intel_core_i5-_16gb_ram-_512gb_ssd-_macos-_full03_j8bompaz.jpg?output-format=webp");
                    expect(res.body).toHaveProperty("price", 32000000);
                    expect(res.body).toHaveProperty("stock", 20);

                    done();
                }
            })
    })

    test('System should return product not found', (done) => {
        request(app)
            .get('/product/10000')
            .set('access_token', access_token)
            .end((err, res) => {
                if(err) {
                    throw err;
                } else {
                    expect(res.status).toBe(404);
                    expect(res.body).toBeInstanceOf(Object);
                    expect(res.body).toHaveProperty('error');
                    expect(res.body.error).toBeInstanceOf(Object);
                    expect(res.body.error).toHaveProperty('message', 'Product not found');

                    done();
                }
            })
    })
})