const request = require("supertest")
const app = require('../app.js')
const { sequelize } = require('../models/index.js')
const { queryInterface } = sequelize

describe("GET /product", () => {
    test("200 Success Read - should return all product", done => {
        request(app)
            .get("/product")
            .set('Accept', 'application/json')
            .set({'access_token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQG1haWwuY29tIiwiaWF0IjoxNTk1NDA4NTU2fQ.9TM81x8P979QHRtC7eJYlVDHomgg0ny561d-1qiu0iM'})
            .end((err,res) => {
                if (err) throw err

                const { status, body } = res

                expect(status).toBe(200)
                expect(body[0]).toHaveProperty("id", expect.any(Number))
                expect(body[0]).toHaveProperty("name", expect.any(String))
                expect(body[0]).toHaveProperty("image_url", expect.any(String))
                expect(body[0]).toHaveProperty("price", expect.any(Number))
                expect(body[0]).toHaveProperty("stock", expect.any(Number))
                expect(body[0]).toHaveProperty("createdAt", expect.anything())
                expect(body[0]).toHaveProperty("updatedAt", expect.anything())

                done()
            })
    })

    test.only("401 Failed Read - user not logged in - should return error message", done => {
        request(app)
            .get("/product")
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) throw err

                const { body, status } = res
                expect(status).toBe(401)
                expect(body).toHaveProperty("message","Please login to use this application!")

                done();
            })
    })

    test.only("403 Failed Read - forbidden action  - should return error message", done => {
        request(app)
            .get("/product")
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