const request = require('supertest')
const app = require('../app')
const { signToken } = require('../helpers/jwt')

const { clearUsers } = require('./helpers/cleartable')
const { createUsers } = require('./helpers/createTable')

beforeAll(createUsers)
afterAll(clearUsers)

const admin = { email:'admin@admin.com' }
const user = { email:'user@user.com' }
const tokenAdmin = signToken(admin)
const tokenUser = signToken(user)

describe('All Routes Test', function() {
    test.skip('create new user', function(done) {
        request(app)
        .post('/register')
        .send({email: 'sandi@user.com', password: 'password', role: 'admin'})
        .end(function(err, res) {
            if(err) throw err

            expect(res.status).toBe(201)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('token')
            done()
        })
    })
    test('create validation error', function(done) {
        request(app)
        .post('/register')
        .send({email: '', password: '', role: ''})
        .end(function(err, res) {
            if(err) throw err
            
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('errors')
            expect(res.body.errors).toBeInstanceOf(Array)
            done()
        })
    })
    test('Login to app', function(done) {
        request(app)
        .post('/login')
        .send({email: 'admin@admin.com', password: 'password'})
        .end(function(err, res) {
            if(err) throw err
    
            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('token')
    
            done()
        })
    })
    test('Get all products data', function(done) {
        request(app)
        .get('/products')
        .set({token: tokenAdmin})
        .end(function(err, res) {
            if(err) throw err
    
            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Array)
            done()
        })
    })
    test('Get all product Validation islogin', function(done) {
        request(app)
        .get('/products')
        .set({token: ''})
        .end(function(err, res) {
            if(err) throw err
    
            expect(res.status).toBe(401)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('errors')
            done()
        })
    })
})



