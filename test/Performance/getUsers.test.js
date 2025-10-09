import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 10 },
    { duration: '20s', target: 10 },
    { duration: '10s', target: 30 },
    { duration: '20s', target: 30 },
    { duration: '20s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
  }
};

export default function () {
  const res = http.get('http://localhost:3000/users');
  check(res, {
    'Validar que o Status é 200': (r) => r.status === 200,
    'resposta é um array': (r) => Array.isArray(r.json()),
  });

  sleep(1);
}
