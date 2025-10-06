const request = require('supertest');
const { expect } = require('chai');
const { faker } = require('@faker-js/faker');
require('dotenv').config();
const postregister = require("../fixtures/postUsersRegister.json");

describe('POST /users/register', () => {
    it('Deve retornar 201 com as informações do usuário cadastrado', async () => {
        const bodyregister = { ...postregister };
        bodyregister.username = faker.internet.username();

        const resposta = await request(process.env.BASE_URL)
            .post('/users/register')
            .set('Content-Type', 'application/json')
            .send(bodyregister);
        expect(resposta.status).to.equal(201);
        expect(resposta.body.username).to.equal(bodyregister.username);
        expect(resposta.body.favorecidos).to.deep.equal(["Maria"]);
    });

    it('Deve retornar 400 com mensagem avisando que usuário já foi cadastrado', async () => {
        const bodyregister = { ...postregister };

        const resposta = await request(process.env.BASE_URL)
            .post('/users/register')
            .set('Content-Type', 'application/json')
            .send(bodyregister);
        expect(resposta.status).to.equal(400);
        expect(resposta.body.error).to.equal("Usuário já existe");
    });

    it('Deve retornar 400 com mensagem avisando que username é obrigatorio', async () => {
        const bodyregister = { ...postregister };
        bodyregister.username = "";

        const resposta = await request(process.env.BASE_URL)
            .post('/users/register')
            .set('Content-Type', 'application/json')
            .send(bodyregister);
        expect(resposta.status).to.equal(400);
        expect(resposta.body.error).to.equal("Usuário e senha obrigatórios");
    });

    it('Deve retornar 400 com mensagem avisando que password é obrigatorio', async () => {
        const bodyregister = { ...postregister };
        bodyregister.password = "";

        const resposta = await request(process.env.BASE_URL)
            .post('/users/register')
            .set('Content-Type', 'application/json')
            .send(bodyregister);
        expect(resposta.status).to.equal(400);
        expect(resposta.body.error).to.equal("Usuário e senha obrigatórios");
    });

    it('Deve retornar 201 e permitir cadastro de usuário sem favorecidos', async () => {
        const bodyregister = { ...postregister };
        bodyregister.username = faker.internet.username();
        bodyregister.favorecidos = [];

        const resposta = await request(process.env.BASE_URL)
            .post('/users/register')
            .set('Content-Type', 'application/json')
            .send(bodyregister);
        expect(resposta.status).to.equal(201);
        expect(resposta.body.username).to.equal(bodyregister.username);
        expect(resposta.body.favorecidos).to.deep.equal([]);
    });
});
