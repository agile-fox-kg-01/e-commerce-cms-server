const request = require('supertest');

const { Product } = require('../models/index')

const app = require('../app');

describe('PRODUCT', function () {
    test('Dapat menampilkan Array of Object Seluruh Product', function (done) {
        request(app)
            .get('/products')
            .end(function (err, res) {
                if (err) throw err;

                expect(res.status).toBe(200);
                expect(res.body).toBeInstanceOf(Array);

                done();
            })
    });
    test('Dapat menampilkan Object Product Baru', function (done) {
        request(app)
            .post('/products')
            .send({ name: "Shampo", image_url: "http:shampo.com", price: 10000, stock: 10 })
            .end(function (err, res) {
                if (err) throw err;

                expect(res.status).toBe(201);
                expect(res.body).toBeInstanceOf(Object);
                expect(res.body).toHaveProperty("id");

                expect(res.body).toHaveProperty("name", "Shampo");
                expect(res.body).toHaveProperty("image_url", "http:shampo.com");
                expect(res.body).toHaveProperty("price", 10000);
                expect(res.body).toHaveProperty("stock", 10);

                done()
            })
    });
    test('Dapat menampilkan pesan validation error is Empty', function (done) {
        request(app)
            .post('/products')
            .send({ name: "", image_url: "", price: "", stock: "" })
            .end(function (err, res) {
                if (err) throw err;

                expect(res.status).toBe(400);
                expect(res.body).toBeInstanceOf(Object);
                expect(res.body).toHaveProperty("errors");

                expect(res.body.errors).toBeInstanceOf(Array)
                expect(res.body.errors).toContainEqual({ message: 'Product name is required' })
                expect(res.body.errors).toContainEqual({ message: 'Product Image Url is required' })
                expect(res.body.errors).toContainEqual({ message: 'Product price is required' })
                expect(res.body.errors).toContainEqual({ message: 'Product stock is required' })

                done()
            })
        
    })
    test('Dapat menampilkan pesan validation error is Stock and price negative', function (done) {
        request(app)
            .post('/products')
            .send({ name: "Shampo", image_url: "http://imageshampo.com", price: -7, stock: -2 })
            .end(function (err, res) {
                if (err) throw err;

                expect(res.status).toBe(400);
                expect(res.body).toBeInstanceOf(Object);
                expect(res.body).toHaveProperty("errors");

                expect(res.body.errors).toBeInstanceOf(Array)
                expect(res.body.errors).toContainEqual({ message: 'Validation min on price failed' })
                expect(res.body.errors).toContainEqual({ message: 'Validation min on stock failed' })

                done()
            })

    });
    test('Dapat menghapus product tertentu', async function () {
        const newProduct = await request(app)
            .post("/products")
            .send({
                name: "Shampo",
                image_url: "http:shampo.com",
                price: 10000,
                stock: 10
            });
        const removedProduct = await request(app)
            .delete(`/products/${newProduct.body.id}`);
        
        expect(removedProduct.body).toEqual({ message: "Deleted" });
        expect(removedProduct.statusCode).toBe(200);
    });
    test('Dapat menampilkan pesan error ketika menghapus product yang tidak ada', async function () {
        const removedProduct = await request(app)
            .delete(`/products/0`);

        expect(removedProduct.body).toEqual({ message: "Cant update/delete, because Product not found" });
        expect(removedProduct.statusCode).toBe(404);
    });
    test('Dapat mengupdate data product tertentu', async function () {
        const newProduct = await request(app)
            .post("/products")
            .send({
                name: "Shampoo",
                image_url: "http:shampo.comm",
                price: 100002,
                stock: 103
            });
        const updatedProduct = await request(app)
            .patch(`/products/${newProduct.body.id}`)
            .send({
                name: "Shampo",
                image_url: "http:shampo.com",
                price: 10000,
                stock: 10
            });
        expect(updatedProduct.statusCode).toBe(200);
        expect(updatedProduct.body).toEqual({ message: "Update Success"})
    });
    test('Dapat menampilkan eror ketika databaru is Empty ', async function () {
        const newProduct = await request(app)
            .post("/products")
            .send({
                name: "Shampoo",
                image_url: "http:shampo.comm",
                price: 100002,
                stock: 103
            });
        const updatedProduct = await request(app)
            .patch(`/products/${newProduct.body.id}`)
            .send({
                name: "",
                image_url: "",
                price: "",
                stock: ""
            });
        expect(updatedProduct.statusCode).toBe(400);
        expect(updatedProduct.body).toHaveProperty("errors");

        expect(updatedProduct.body.errors).toBeInstanceOf(Array)
        expect(updatedProduct.body.errors).toContainEqual({ message: 'Product name is required' })
        expect(updatedProduct.body.errors).toContainEqual({ message: 'Product Image Url is required' })
        expect(updatedProduct.body.errors).toContainEqual({ message: 'Product price is required' })
        expect(updatedProduct.body.errors).toContainEqual({ message: 'Product stock is required' })
    });
    test('Dapat menampilkan eror ketika databaru price dan stock adalah negative ', async function () {
        const newProduct = await request(app)
            .post("/products")
            .send({
                name: "Shampoo",
                image_url: "http:shampo.comm",
                price: 100002,
                stock: 103
            });
        const updatedProduct = await request(app)
            .patch(`/products/${newProduct.body.id}`)
            .send({
                name: "Sabun",
                image_url: "http:shampo.comm",
                price: -3,
                stock: -4
            });
        expect(updatedProduct.statusCode).toBe(400);
        expect(updatedProduct.body).toHaveProperty("errors");

        expect(updatedProduct.body.errors).toBeInstanceOf(Array)
        expect(updatedProduct.body.errors).toContainEqual({ message: 'Validation min on price failed' })
        expect(updatedProduct.body.errors).toContainEqual({ message: 'Validation min on stock failed' })
    });



})
