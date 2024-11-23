import { check } from 'k6';
import http from 'k6/http';

export let options = {
    stages: [
      { duration: '1m', target: 10 }, // Ramp-up to 10 VUs over 2 minutes
      { duration: '3m', target: 30 }, // Sustain 30 VUs for 3 minutes
      { duration: '1m', target: 0 },  // Ramp down to 0 VUs over 1 minute
    ],
  };

export default function () {
  const url = 'http://127.0.0.1:64097'; // minikube service server-service  --url
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

  // Check if the response status is 200 (successful)
  check(res, {
    'is status 200': (r) => r.status === 200,
  });

  // Optionally, check that the response includes the expected fields
  check(res, {
    'response contains categories': (r) => r.body.includes('categories'),
    'response contains deals': (r) => r.body.includes('deals'),
  });
}