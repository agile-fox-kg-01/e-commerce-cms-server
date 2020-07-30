const request = require("supertest")
const app = require('../app.js')
const { sequelize } = require('../models/index.js')
const { queryInterface } = sequelize

describe("Product routers", () => {
    //Empty database
    // afterAll(async done => {
    //     try {
    //         await queryInterface.bulkDelete("Products", {})
    //         done()
    //     } catch (error) {
    //         done(error)
    //     }
    // })

    describe("POST /product", () => {
        const testProduct = {
            name: 'product_test_with_auth',
            image_url: "https://unsplash.com/photos/_wkd7XBRfU4",
            price: 1000,
            stock: 9
        }

        test("201 Success Create - should return product", done => {
            request(app)
                .post("/product")
                .send(testProduct)
                .set({'access_token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwiaWF0IjoxNTk1NDA4NTU2fQ.9TM81x8P979QHRtC7eJYlVDHomgg0ny561d-1qiu0iM'})
                .end((err, res) => {
                    if (err) throw err

                    const { body, status } = res

                    expect(status).toBe(201)
                    expect(body).toHaveProperty("id", expect.any(Number))
                    expect(body).toHaveProperty("name", testProduct.name)
                    expect(body).toHaveProperty("image_url", testProduct.image_url)
                    expect(body).toHaveProperty("price", testProduct.price)
                    expect(body).toHaveProperty("stock", testProduct.stock)

                    done();
                })
        })

        test("400 Failed Create - empty name, image_url, price, stock - should return error message", done => {
            request(app)
                .post("/product")
                .send({
                    name: "",
                    image_url: "",
                    price: "",
                    stock: ""
                })
                .set('Accept', 'application/json')
                .end((err, res) => {
                    if (err) throw err

                    const { body, status } = res

                    expect(status).toBe(400)
                    expect(body.message).toEqual(expect.arrayContaining(["Name is required!"]))
                    expect(body.message).toEqual(expect.arrayContaining(["Image URL is required!"]))
                    expect(body.message).toEqual(expect.arrayContaining(["Price is required!"]))
                    expect(body.message).toEqual(expect.arrayContaining(["Stock is required!"]))

                    done();
                })
        })

        test("400 Failed Create - invalid image url - should return error message", done => {
            request(app)
                .post("/product")
                .send({
                    name: testProduct.name,
                    image_url: "abcde",
                    price: testProduct.price,
                    stock: testProduct.stock
                })
                .set('Accept', 'application/json')
                .end((err, res) => {
                    if (err) throw err

                    const { body, status } = res
                    expect(status).toBe(400)
                    expect(body.message).toEqual(expect.arrayContaining(["Please input correct URL format"]))

                    done();
                })
        })

        test("400 Failed Create - 0 or negative price - should return error message", done => {
            request(app)
                .post("/product")
                .send({
                    name: testProduct.name,
                    image_url: testProduct.image_url,
                    price: -1,
                    stock: testProduct.stock
                })
                .set('Accept', 'application/json')
                .end((err, res) => {
                    if (err) throw err

                    const { body, status } = res

                    expect(status).toBe(400)
                    expect(body.message).toEqual(expect.arrayContaining(["Minimum price is 1!"]))

                    done();
                })
        })

        test("400 Failed Create - negative stock - should return error message", done => {
            request(app)
                .post("/product")
                .send({
                    name: testProduct.name,
                    image_url: testProduct.image_url,
                    price: testProduct.price,
                    stock: -1
                })
                .set('Accept', 'application/json')
                .end((err, res) => {
                    if (err) throw err

                    const { body, status } = res
                    expect(status).toBe(400)
                    expect(body.message).toEqual(expect.arrayContaining(["Minimum stock is 0!"]))

                    done();
                })
        })

        test.only("401 Failed Create - user not logged in - should return error message", done => {
            request(app)
                .post("/product")
                .send({
                    name: testProduct.name,
                    image_url: testProduct.image_url,
                    price: testProduct.price,
                    stock: testProduct.stock
                })
                .set('Accept', 'application/json')
                .end((err, res) => {
                    if (err) throw err

                    const { body, status } = res
                    expect(status).toBe(401)
                    expect(body).toHaveProperty("message","Please login to use this application!")

                    done();
                })
        })

        test.only("403 Failed Create - forbidden action  - should return error message", done => {
            request(app)
                .post("/product")
                .send({
                    name: testProduct.name,
                    image_url: testProduct.image_url,
                    price: testProduct.price,
                    stock: testProduct.stock
                })
                .set('Accept', 'application/json')
                .set({'access_token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQG1haWwuY29tIiwiaWF0IjoxNTk1NDEwMzc5fQ.HuYCrAuGXFix77jwZI2zKH6jyg7eclYmykoQWR7-D5I'})
                .end((err, res) => {
                    if (err) throw err

                    const { body, status } = res
                    expect(status).toBe(403)
                    expect(body).toHaveProperty("message","You are unauthorized to modify this data!")

                    done();
                })
        })
    })
})