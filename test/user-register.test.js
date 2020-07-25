const request = require("supertest")
const app = require('../app.js')
const { sequelize } = require('../models/index.js')
const { queryInterface } = sequelize


describe("POST /user/register", () => {
    // Empty database
    // afterAll(async done => {
    //     try {
    //         await queryInterface.bulkDelete("Users", {})
    //         done()
    //     } catch (error) {
    //         done(error)
    //     }
    // })

    const testUser = {
        email: 'user1@mail.com',
        password: "pass1"
    }

    test("201 Success Create - should return json", done => {
        request(app)
            .post("/user/register")
            .send(testUser)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) throw err

                const { body, status } = res

                expect(status).toBe(201)
                expect(body).toHaveProperty("id", expect.any(Number))
                expect(body).toHaveProperty("email", testUser.email)

                done();
            })
    })

    test.only("400 Failed Create - empty email, password - should return error message", done => {
        request(app)
            .post("/user/register")
            .send({
                email: "",
                password: ""
            })
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) throw err

                const { body, status } = res

                expect(status).toBe(400)
                expect(body.message).toEqual(expect.arrayContaining(["Email is required!"]))
                expect(body.message).toEqual(expect.arrayContaining(["Password is required!"]))

                done();
            })
    })

    test("400 Failed Create - invalid email - should return error message", done => {
        request(app)
            .post("/user/register")
            .send({
                email: "1234567",
                username: "test2",
                password: "pass2"
            })
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err) throw err

                const { body, status } = res

                expect(status).toBe(400)
                expect(body.message).toEqual(expect.arrayContaining(["Please input a valid email!"]))

                done();
            })
    })
})