import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 100 }, // below normal load
    { duration: '20s', target: 100 },
    { duration: '10s', target: 200 }, // normal load
    { duration: '20s', target: 200 },
    { duration: '10s', target: 300 }, // around the breaking point
    { duration: '20s', target: 300 },
    { duration: '10s', target: 400 }, // beyond the breaking point
    { duration: '20', target: 400 },
    { duration: '1m', target: 0 }, // scale down. Recovery stage.
  ],
};

export default function () {
  const BASE_URL = 'https://test-api.k6.io'; // make sure this is not production

  const responses = http.batch([
    ['GET', `${BASE_URL}/public/crocodiles/1/`, null, { tags: { name: 'PublicCrocs' } }],
    ['GET', `${BASE_URL}/public/crocodiles/2/`, null, { tags: { name: 'PublicCrocs' } }],
    ['GET', `${BASE_URL}/public/crocodiles/3/`, null, { tags: { name: 'PublicCrocs' } }],
    ['GET', `${BASE_URL}/public/crocodiles/4/`, null, { tags: { name: 'PublicCrocs' } }],
  ]);

  sleep(1);
}