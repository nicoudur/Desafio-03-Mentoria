const request = require('supertest');
const { expect } = require('chai');
require ('dotenv').config()
const { obterToken } = require('../helpers/logarUsuario')
const postTransfers = require('../fixtures/postTransfers.json')


describe ('Transfers', () => {

    let token
        
    beforeEach(async () => {
            token = await obterToken ('julio.lima', '123456')
    })

    describe ('GET /transfers', () => {
        it ('Deve retornar 10 elementos na paginação quando informar limite de 10 registros', async () => {
            const response = await request (process.env.BASE_URL)

                .get('/transfers')
                .set ('Authorization', `Bearer ${token}`)

                expect (response.status).to.equal(200)

        })

        it ('Deve retornar 10 elementos na paginação quando informar limite de 10 registros', async () => {
            const response = await request (process.env.BASE_URL)

                .get('/transfers')
                // .set ('Authorization', `Bearer ${token}`)

                expect (response.status).to.equal(401)

        })
    })

    
})

    