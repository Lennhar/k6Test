import http from 'k6/http';

const url = 'https://httpbin.test.k6.io/put';
export const options = {

    scenarios: {

        k6Test: {

            executor: 'per-vu-iterations',
            vus: 100,
            iterations: 10,
            maxDuration: '10m',
        },

    },

}; 
export default function () {
  const headers = { 'Content-Type': 'application/json' };
  const data = { name: 'Bert' };

  const res = http.put(url, JSON.stringify(data), { headers: headers });

  console.log(JSON.parse(res.body).json.name);
}