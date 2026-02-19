import http from "k6/http";
import { check } from "k6";

// Test rapide pour vérifier que tout fonctionne (1 VU, quelques requêtes)
export const options = {
  vus: 1,
  iterations: 5,
};

const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";

export default function () {
  const res = http.get(`${BASE_URL}/api/articles`);

  check(res, {
    "status is 200": (r) => r.status === 200,
    "response time < 200ms": (r) => r.timings.duration < 200,
  });

  console.log(`Response time: ${res.timings.duration}ms`);
}
