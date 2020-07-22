const request = require('supertest');

// const { Users } = require('../models/index')

const app = require('../app');

describe('User', function () {
    test('Dapat login dan mendapat token', function (done){
        request(app)
            .post('/users/login')
            .send({ email: 'admin@mail.com', password: '1234' })
            .end( function(err, res) {
                if (err) throw err
                
                expect(res.status).toBe(200);
                expect(res.body).toBeInstanceOf(Object);
                expect(res.body).toHaveProperty("token");

                done()
            })
    })
    test('Dapat menampilkan error jika email/password salah', function (done) {
        request(app)
            .post('/users/login')
            .send({ email: 'admin@mail.com', password: '12345' })
            .end(function (err, res) {
                if (err) throw err
                expect(res.status).toBe(400);
                expect(res.body).toBeInstanceOf(Object);
                expect(res.body).toEqual({ message: 'Invalid email and password' })

                done()
            })
    })
})