import { check, sleep } from 'k6';
import http from 'k6/http';

export let options = {
    stages: [
      { duration: '30s', target: 400 },
      { duration: '2m', target: 200 },
      { duration: '1m', target: 0 },  
    ],
  };

export default function () {
  const url = 'http://localhost:4000/graphql'; // minikube service server-service  --url
  const query = JSON.stringify({
    query: `
      query {
        categories {
          id
          name
          imageUrl
          deals {
            id
            name
            description
            detailedDescription
            price
            discount
            expiresAt
            imageUrl
          }
        }
      }
    `,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, query, params);
  sleep(1);

  check(res, {
    'is status 200': (r) => r.status === 200,
  });

  check(res, {
    'response contains categories': (r) => r.body.includes('categories'),
    'response contains deals': (r) => r.body.includes('deals'),
  });
}