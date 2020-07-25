const request = require('supertest')
const app = require('../app.js');

describe.skip('POST /login', () => {
  test('200 login uccess - should return access_token', (done) => {
    request(app)
      .post('/login')
      .send({
        email: 'admin@mail.com',
        password: 'enkripsi("1234")'
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty('access_token');
        done();
      })
      .catch((err) =>
        done(err));
  })

  test('404 not found - should return password incorrect', (done) => {
    request(app)
      .post('/login')
      .send({
        email: 'admin@mail.com',
        password: 'nkripsi("1234")'
      })
      .end((err, res) => {
        if (err) throw (err);

        expect(res.status).toBe(404)
        expect(res.text).toEqual('"Password Incorrect"')
        done()
      })

  })

  test('404 not found - should return not an admin, email incorrect', (done) => {
    request(app)
      .post('/login')
      .send({
        email: 'dmin@mail.com',
        password: 'enkripsi("1234")'
      })
      .end((err, res) => {
        if (err) throw err;
        expect(res.status).toBe(404)
        expect(res.text).toEqual('"Not an admin, email incorrect"')
        done()
      })

  })
});



