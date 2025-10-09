import http from 'k6/http';
import { sleep, check } from 'k6';
const postTransfers = JSON.parse(open('../fixtures/postTransfers.json'))
import { pegarBaseURL } from '../utils/variaveis.js';
import { obterToken } from '../helpers/logarUsuarioK6.js';



export const options = {
    stages: [
        { duration: '5s', target: 10 },
        { duration: '20s', target: 10 },
        { duration: '5s', target: 0 },

    ],
    thresholds: {

        http_req_duration: ['p(90)<3000', 'max<5000'],
        http_req_failed: ['rate<0.01'],
    },
};

export default function () {
    const token = obterToken();
    const bodytranfers = { ...postTransfers };
    
    const url = pegarBaseURL() + '/transfers';
    const payload = JSON.stringify(bodytranfers);

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    };

    const res = http.post(url, payload, params);

    check(res, {
        'Validar que status é 201': (r) => r.status === 201,
        

    })

    sleep(1)
}