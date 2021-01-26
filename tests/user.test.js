const request = require('supertest')
const app = require('../app')

const { clearUsers } = require('./helpers/cleartable')
const { seedUsers } = require('./helpers/seedTable')

beforeAll(seedUsers)
afterAll(clearUsers)

describe('User All Routes Test', function() {
    // work only first time because unique validation
    test('register', function(done) {
        request(app)
        .post('/register')
        .send({email: 'sandi@user.com', password: 'password', role: 'admin'})
        .end(function(err, res) {
            if(err) throw err

            expect(res.status).toBe(201)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('email', 'sandi@user.com')
            done()
        })
    })
    test('register unique validation', function(done) {
        request(app)
        .post('/register')
        .send({email: 'admin@user.com', password: 'password', role: 'admin'})
        .end(function(err, res) {
            if(err) throw err

            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('errors', 'Email already exists')
            done()
        })
    })
    test('register validation error field empty', function(done) {
        request(app)
        .post('/register')
        .send({email: '', password: '', role: ''})
        .end(function(err, res) {
            if(err) throw err
            
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('errors')
            done()
        })
    })
    test('Login to app', function(done) {
        request(app)
        .post('/login')
        .send({email: 'admin@user.com', password: 'password'})
        .end(function(err, res) {
            if(err) throw err
    
            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('token')
    
            done()
        })
    })
    test('validation Login to app wrong username', function(done) {
        request(app)
        .post('/login')
        .send({email: 'user10@user.com', password: 'password'})
        .end(function(err, res) {
            if(err) throw err
    
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('errors', 'invalid username or password')
    
            done()
        })
    })
    test('validation Login to app wrong password', function(done) {
        request(app)
        .post('/login')
        .send({email: 'admin@user.com', password: 'asalketik'})
        .end(function(err, res) {
            if(err) throw err
    
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('errors', 'invalid username or password')
    
            done()
        })
    })
})
