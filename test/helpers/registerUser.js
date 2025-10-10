const request = require('supertest');

async function registrarUsuario(baseUrl, body) {
    return request(baseUrl)
        .post('/users/register')
        .set('Content-Type', 'application/json')
        .send(body);
}

module.exports = { registrarUsuario };
