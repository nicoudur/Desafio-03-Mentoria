const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config()
const postLogin = require('../fixtures/postLogin.json')

describe('Login', () => {
    describe('POST /users/login', () => {
        it('Deve retornar 200 com o token em string quando usar credenciais válidas', async () => {

            const bodyLogin = { ...postLogin }

            const resposta = await request(process.env.BASE_URL)
            .post('/users/login')
            .set('Content-Type', 'application/json')
            .send(bodyLogin)

            expect(resposta.status).to.equal(200);
            expect(resposta.body.token).to.be.a('string');
        })

        it('Deve retornar 400 com o mensagem de Usuário não encontrado', async () => {

            const bodyLogin = { ...postLogin }

            bodyLogin.username = 'teste'

            const resposta = await request(process.env.BASE_URL)
            .post('/users/login')
            .set('Content-Type', 'application/json')
            .send(bodyLogin)

            expect(resposta.status).to.equal(400);
            expect(resposta.body.error).to.equal("Usuário não encontrado");
            
        })
    })
})