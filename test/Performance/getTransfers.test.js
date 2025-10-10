import http from 'k6/http';
import { sleep, check } from 'k6';
import { getBaseURL } from '../utils/variables.js';
import { getToken } from '../helpers/loginUserK6.js';



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
    const token = getToken();
    
    const url = getBaseURL() + '/transfers';
   

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    };

    const res = http.get(url, params);

    check(res, {
        'Validar que status é 200': (r) => r.status === 200,
        'resposta é um array': (r) => Array.isArray(r.json()),
    })

    sleep(1)
}