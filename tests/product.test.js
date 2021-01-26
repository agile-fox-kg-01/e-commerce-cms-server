const request = require('supertest')
const app = require('../app')
const { signToken } = require('../helpers/jwt')

const { clearUsers } = require('./helpers/cleartable')
const { seedUsers, seedProducts } = require('./helpers/seedTable')

beforeAll(seedUsers)
afterAll(clearUsers)

const admin = { email:'admin@user.com' }
const customer = { email:'customer@user.com' }
const tokenAdmin = signToken(admin)
const tokenCustomer = signToken(customer)

describe('Product All Routes Test', function() {
    beforeAll(seedProducts)
    test('Browse products login as admin', function(done) {
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
    test('auth Validation is not login', function(done) {
        request(app)
        .get('/products')
        .set({token: ''})
        .end(function(err, res) {
            if(err) throw err
    
            expect(res.status).toBe(401)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('errors', 'please login first')
            done()
        })
    })
    test('auth Validation is not admin', function(done) {
        request(app)
        .get('/products')
        .set({token: tokenCustomer})
        .end(function(err, res) {
            if(err) throw err
    
            expect(res.status).toBe(401)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('errors', "You don't have permission to access")
            done()
        })
    })
    test('Read One product login as admin', function(done) {
        request(app)
        .get('/products/2')
        .set({token: tokenAdmin})
        .end(function(err, res) {
            if(err) throw err
    
            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('name', "laptop2")
            done()
        })
    })
    test('Read One product and not find login as admin', function(done) {
        request(app)
        .get('/products/500')
        .set({token: tokenAdmin})
        .end(function(err, res) {
            if(err) throw err
    
            expect(res.status).toBe(404)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('errors', "Product not found")
            done()
        })
    })
    test('Edit One product login as admin', function(done) {
        request(app)
        .put('/products/edit/1')
        .set({token: tokenAdmin})
        .send({name: 'test', image_url: 'test', price: 100000, stock: 3})
        .end(function(err, res) {
            if(err) throw err
    
            expect(res.status).toBe(201)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('name', "test")
            done()
        })
    })
    test('Edit One product and validate minus value login as admin', function(done) {
        request(app)
        .put('/products/edit/1')
        .set({token: tokenAdmin})
        .send({name: 'test', image_url: 'test', price: -5, stock: 3})
        .end(function(err, res) {
            if(err) throw err
    
            expect(res.status).toBe(400)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('errors', "Price cannot be a negative number")
            done()
        })
    })
    test('Add product login as admin', function(done) {
        request(app)
        .post('/products/add')
        .set({token: tokenAdmin})
        .send({name: 'testadd', image_url: 'test', price: 840000, stock: 3})
        .end(function(err, res) {
            if(err) throw err
    
            expect(res.status).toBe(201)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('name', "testadd")
            done()
        })
    })
    // delete only work first time because already deleted
    test.skip('Delete product login as admin', function(done) {
        request(app)
        .delete('/products/delete/5')
        .set({token: tokenAdmin})
        .end(function(err, res) {
            if(err) throw err
    
            expect(res.status).toBe(200)
            expect(res.body).toBeInstanceOf(Object)
            expect(res.body).toHaveProperty('name', "testadd")
            done()
        })
    })
})
