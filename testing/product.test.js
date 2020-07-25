const request = require('supertest')
const app = require('../app.js')
const { generateToken } = require('../helpers/tokenHandler.js')
const { Product } = require('../models/index.js')

const token = generateToken('admin@mail.com')
const products = Product.findAll({})


describe.skip('POST /products', function () {
  test('201 success create new product - should return new product', function (done) {
    request(app)
      .post('/products')
      .send({
        name: 'Books',
        image_URL: "https://www.columbiactlibrary.org/wp-content/uploads/2012/10/books.png",
        price: 50000,
        stock: 1
      })
      .set({
        access_token: token
      })
      .end(function (err, res) {
        expect(res.body).toBeInstanceOf(Object)
        expect(res.body).toHaveProperty('name', 'Books')
        done()
      })
  })

  test('401 errors - should return jwt malformed', function (done) {
    request(app)
      .post('/products')
      .send({
        name: 'Books',
        image_URL: "https://www.columbiactlibrary.org/wp-content/uploads/2012/10/books.png",
        price: 50000,
        stock: 4
      })
      .set({
        access_token: null
      })
      .end(function (err, res) {
        if (err) throw err;
        expect(res.status).toBe(401)
        expect(res.body).toHaveProperty('errors', [{ message: "jwt malformed" }])
        done()
      })
  })

  test('400 bad request - should return validation message', function (done) {
    request(app)
      .post('/products')
      .send({
        name: null,
        image_URL: null,
        stock: -1,
        price: null
      })
      .set({
        access_token: token
      })
      .end((err, res) => {
        if (err) throw (err)
        // console.log(res.body);
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        done()
      })
  })

})

describe.skip('GET /products', function () {
  test('200 - should return json/products', (done) => {
    request(app)
      .get('/products')
      .set({
        access_token: token
      })
      .end((err, res) => {
        if (err) throw err;

        expect(res.status).toBe(200)
        expect.arrayContaining(products)
        done()
      })
  })

  test('400 - should return jwt malformed', (done) => {
    request(app)
      .get('/products')
      .set({
        access_token: null
      })
      .end((err, res) => {
        if (err) throw err;

        expect(res.status).toBe(401)
        expect(res.body).toHaveProperty('errors', [{ message: "jwt malformed" }])
        done()
      })
  })

})

describe('PUT /product', function () {
  test('201 - should return array of number', (done) => {
    request(app)
    .put('/products/2')
    .set({
        access_token: token
    })
    .send({
        name: 'Iphone-8',
        price: 30000,
        stock: 3,
        image_url: 'image_URL: "https://www.columbiactlibrary.org/wp-content/uploads/2012/10/books.png'
    })
    .end((err,res)=>{
      if(err)throw err;
      
      expect(res.status).toBe(201)
      expect(res.body).toBeInstanceOf(Object)
      done()
    })
  })
})