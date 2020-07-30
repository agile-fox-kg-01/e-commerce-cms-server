const request = require("supertest")
const app = require('../app.js')
const { sequelize } = require('../models/index.js')
const { queryInterface } = sequelize


describe("POST /user/login", () => {
    const admin = {
        email: 'user1@mail.com',
        password: "pass1"
    }

    test.only("200 Success Login - should return token", done => {
        request(app)
            .post("/user/login")
            .send(admin)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) throw err

                const { body, status } = res
                expect(status).toBe(200)
                expect(body).toHaveProperty("access_token", expect.any(String))

                done();
            })
    })

    const userSalah = {
        email: 'usersalah@mail.com',
        password: "passwordsalah"
    }
    test.only("400 Failed Login - should return error message", done => {
        request(app)
            .post("/user/login")
            .send(userSalah)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) throw err

                const { body, status } = res
                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "invalid email/password")

                done();
            })
    })
})