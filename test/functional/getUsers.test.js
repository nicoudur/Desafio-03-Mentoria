
const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();

describe('GET /users', () => {
  it('deve retornar status 200 e um array', async () => {
    const response = await request(process.env.BASE_URL).get('/users');
    expect(response.statusCode).to.equal(200);
    expect(Array.isArray(response.body)).to.be.true;
  });
});