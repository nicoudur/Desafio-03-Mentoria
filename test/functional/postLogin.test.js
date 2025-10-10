const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config()
const postLogin = require('../fixtures/postLogin.json')

describe('Login', () => {
    describe('POST /users/login', () => {
        it('Deve retornar 200 com o token em string quando usar credenciais válidas', async () => {

            const bodyLogin = { ...postLogin }

            const response = await request(process.env.BASE_URL)
                .post('/users/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)

            expect(response.status).to.equal(200);
            expect(response.body.token).to.be.a('string');
        })

        it('Deve retornar 400 com o mensagem de Usuário não encontrado', async () => {

            const bodyLogin = { ...postLogin }

            bodyLogin.username = 'teste'

            const response = await request(process.env.BASE_URL)
                .post('/users/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)

            expect(response.status).to.equal(400);
            expect(response.body.error).to.equal("Usuário não encontrado");

        })

        it('Deve retornar 400 com o mensagem de Senha inválida', async () => {

            const bodyLogin = { ...postLogin }

            bodyLogin.password = 'teste'

            const response = await request(process.env.BASE_URL)
                .post('/users/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)

            expect(response.status).to.equal(400);
            expect(response.body.error).to.equal("Senha inválida");

        })

        it('Deve retornar 400 com obrigatoriedade de usuario e mensagem de Usuário e senha obrigatórios', async () => {

            const bodyLogin = { ...postLogin }

            bodyLogin.username = ''

            const response = await request(process.env.BASE_URL)
                .post('/users/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)

            expect(response.status).to.equal(400);
            expect(response.body.error).to.equal("Usuário e senha obrigatórios");

        })

        it('Deve retornar 400 com obrigatoriedade de senha e mensagem de Usuário não encontrado', async () => {

            const bodyLogin = { ...postLogin }

            bodyLogin.password = ''

            const response = await request(process.env.BASE_URL)
                .post('/users/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)

            expect(response.status).to.equal(400);
            expect(response.body.error).to.equal("Usuário e senha obrigatórios");

        })

    })
})