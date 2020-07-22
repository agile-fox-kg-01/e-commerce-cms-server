'use strict';

const request = require('supertest');
const app = require('../app');

const user = {
    name: 'Admin',
    email: 'admintes@admin.com',
    password: '12345',
    AccessGroupId: 1
};

// POST /login
describe('Login as an admin', () => {
    test('User', (done) => {
        request(app)
            .post('/login')
            .send(user)
            .set("Accept", "application/json")
            .end((err, res) => {
                if(err) {
                    throw err;
                } else {
                    expect(res.status).toBe(200);
                    expect(res.body).toHaveProperty("name", user.name);
                    expect(res.body).toHaveProperty("access_token", expect.any(String));

                    done();
                }
            })
    })
})