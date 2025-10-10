const request = require('supertest');
const { expect } = require('chai');
const { faker } = require('@faker-js/faker');
require('dotenv').config();
const postregister = require("../fixtures/postRegister.json");
const { registrarUsuario } = require('../helpers/registerUser');

describe('POST /users/register', () => {
    it('Deve retornar 201 com as informações do usuário cadastrado', async () => {
        const bodyregister = { ...postregister };
        bodyregister.username = faker.internet.username();

        const response = await registrarUsuario(process.env.BASE_URL, bodyregister);

        expect(response.status).to.equal(201);
        expect(response.body.username).to.equal(bodyregister.username);
        expect(response.body.favorecidos).to.deep.equal(["Maria"]);
    });

    it('Deve retornar 400 com mensagem avisando que usuário já foi cadastrado', async () => {
        const bodyregister = { ...postregister };

        await registrarUsuario(process.env.BASE_URL, bodyregister);
        const response = await registrarUsuario(process.env.BASE_URL, bodyregister);

        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal("Usuário já existe");
    });

    it('Deve retornar 400 com mensagem avisando que username é obrigatorio', async () => {
        const bodyregister = { ...postregister };
        bodyregister.username = "";

        const response = await registrarUsuario(process.env.BASE_URL, bodyregister);

        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal("Usuário e senha obrigatórios");
    });

    it('Deve retornar 400 com mensagem avisando que password é obrigatorio', async () => {
        const bodyregister = { ...postregister };
        bodyregister.password = "";

        const response = await registrarUsuario(process.env.BASE_URL, bodyregister);

        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal("Usuário e senha obrigatórios");
    });

    it('Deve retornar 201 e permitir cadastro de usuário sem favorecidos', async () => {
        const bodyregister = { ...postregister };
        bodyregister.username = faker.internet.username();
        bodyregister.favorecidos = [];

       const response = await registrarUsuario(process.env.BASE_URL, bodyregister);
       
        expect(response.status).to.equal(201);
        expect(response.body.username).to.equal(bodyregister.username);
        expect(response.body.favorecidos).to.deep.equal([]);
    });
});
