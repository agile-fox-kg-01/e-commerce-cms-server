const request = require("supertest")
const app = require('../app.js')
const { sequelize } = require('../models/index.js')
const { queryInterface } = sequelize

describe("PUT /product", () => {
    const updatedProduct = {
        name: 'update_test',
        image_url: "https://unsplash.com/photos/update",
        price: 100,
        stock: 5
    }

    test("200 Success Update - should return updated product", done => {
        request(app)
            .put("/product/12")
            .set('Accept', 'application/json')
            .set({'access_token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwiaWF0IjoxNTk1NDA4NTU2fQ.9TM81x8P979QHRtC7eJYlVDHomgg0ny561d-1qiu0iM'})
            .send(updatedProduct)
            .end((err, res) => {
                if (err) throw (err)

                const { status, body } = res

                expect(status).toBe(200)
                expect(body).toHaveProperty("id", expect.any(Number))
                expect(body).toHaveProperty("name", updatedProduct.name)
                expect(body).toHaveProperty("image_url", updatedProduct.image_url)
                expect(body).toHaveProperty("price", updatedProduct.price)
                expect(body).toHaveProperty("stock", updatedProduct.stock)
                expect(body).toHaveProperty("createdAt", expect.anything())
                expect(body).toHaveProperty("updatedAt", expect.anything())

                done()
            })
    })

    test.only("404 Not Found - should return error message", done => {
        request(app)
            .put("/product/9999")
            .set('Accept', 'application/json')
            .set({'access_token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwiaWF0IjoxNTk1NDA4NTU2fQ.9TM81x8P979QHRtC7eJYlVDHomgg0ny561d-1qiu0iM'})
            .send(updatedProduct)
            .then(response => {

                const { status, body } = response

                expect(status).toBe(404)
                expect(body).toHaveProperty("message", "Product not found!")

                done()
            })
            .catch(err => done(err))
    })

    test.only("401 Failed Update - user not logged in - should return error message", done => {
        request(app)
            .put("/product/1")
            .set('Accept', 'application/json')
            .send(updatedProduct)
            .end((err, res) => {
                if (err) throw err

                const { body, status } = res
                expect(status).toBe(401)
                expect(body).toHaveProperty("message","Please login to use this application!")

                done();
            })
    })

    test.only("403 Failed Update - forbidden action  - should return error message", done => {
        request(app)
            .put("/product/1")
            .set('Accept', 'application/json')
            .set({'access_token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQG1haWwuY29tIiwiaWF0IjoxNTk1NDEwMzc5fQ.HuYCrAuGXFix77jwZI2zKH6jyg7eclYmykoQWR7-D5I'})
            .send(updatedProduct)
            .end((err, res) => {
                if (err) throw err

                const { body, status } = res
                expect(status).toBe(403)
                expect(body).toHaveProperty("message","You are unauthorized to modify this data!")

                done();
            })
    })
})