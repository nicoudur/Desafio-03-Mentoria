
const request = require('supertest');
const { expect } = require('chai');
const app = require('../../app');

describe('GET /users', () => {
  it('deve retornar status 200 e um array', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).to.equal(200);
    expect(Array.isArray(res.body)).to.be.true;
  });
});