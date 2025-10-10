import http from 'k6/http';
import { sleep, check } from 'k6';
const postRegister = JSON.parse(open('../fixtures/postRegister.json'))
import { getBaseURL } from '../utils/variables.js';


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
    const bodyregister = { ...postRegister };
    bodyregister.username = "Usuario" + Date.now();

    const url = getBaseURL() + '/users/register';
    const payload = JSON.stringify(bodyregister);

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(url, payload, params);

    check(res, {
        'Validar que status é 201': (r) => r.status === 201,
        'Resposta contém username correto': (r) => r.json('username') === bodyregister.username,

    })

    sleep(1)
}