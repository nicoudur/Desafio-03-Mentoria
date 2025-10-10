const request = require('supertest');
const { expect } = require('chai');
require ('dotenv').config()
const { obterToken } = require('../helpers/logarUsuario')
const postTransfers = require('../fixtures/postTransfers.json')

describe ('Transfers', () => {
    let token

    beforeEach(async () => {
        token = await obterToken ('julio', '123456')
    })

    describe ('POST /transfers', () => {

        it ('Deve retornar 201 quando uma transferência for realizada', async () => {
            const bodyTransfers = {...postTransfers}

            const respostaTransfers = await request (process.env.BASE_URL)

            .post ('/transfers')
            .set ('Content-Type', 'application/json')
            .set ('Authorization', `Bearer ${token}`)
            .send(bodyTransfers)

            expect(respostaTransfers.status).to.equal(201)
        })

        it ('Deve retornar 400 quando houver erro de validação ou regra de negócio', async () => {
            const bodyTransfers = {...postTransfers }
            bodyTransfers.to = 'João Gabriel'
            
            const respostaTransfers = await request (process.env.BASE_URL)
          

            .post ('/transfers')
            .set ('Content-Type', 'application/json')
            .set ('Authorization', `Bearer ${token}`)
            .send(bodyTransfers)

            expect(respostaTransfers.status).to.equal(400)
            
        })
        
        it ('Deve retornar 401 quando não for fornecido um token', async () => {
            const bodyTransfers = {...postTransfers}

            const respostaTransfers = await request (process.env.BASE_URL)

            .post ('/transfers')
            .set ('Content-Type', 'application/json')
            // .set ('Authorization', `Bearer ${token}`)
            .send(bodyTransfers)

            expect(respostaTransfers.status).to.equal(401)
        })

    })

    
    


 

    //     it ('Deve retornar 401 quando for fornecido um token inválido', async () => {
    //     const bodyTransfers = {...postTransfers}

    //     const respostaTransfers = await request (process.env.BASE_URL, bodyTransfers)

    //     .post ('/transfers')
    //     .set ('Content-Type', 'application/json')
    //     .set ('Authorization', `Bearer ${token}`)
    //     .send(bodyTransfers)

    //     expect(respostaTransfers.status).to.equal(201)
    // })
})

