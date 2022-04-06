import http from 'k6/http';

import { sleep, check } from 'k6';


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


    let response = http.get('http://test.k6.io', {
    });

   check(response, { 'status was 200': (r) => r.status == 200 });
    sleep(1); 

}