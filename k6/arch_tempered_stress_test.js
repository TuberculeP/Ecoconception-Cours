import http from "k6/http";
import { check, sleep } from "k6";
import { Rate } from "k6/metrics";

// Test de stress : trouver les limites de l'app
// ATTENTION : surveiller les métriques Grafana pendant ce test !
export const options = {
  stages: [
    { duration: "1m", target: 50 }, // Montée rapide à 50 VUs
  ],
  thresholds: {
    http_req_failed: ["rate<0.5"], // On accepte jusqu'à 50% d'erreurs en stress
    http_req_duration: ["p(90)<2000"], // 90% des requêtes < 2s
  },
};

const errorRate = new Rate("errors");
const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";

export default function () {
  // Mix de requêtes pour stresser différentes parties
  const endpoints = [
    "/",
    "/api/articles?page=1&limit=20",
    "/api/articles?page=2&limit=20",
    "/api/articles/categories",
    "/api/",
  ];

  const endpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
  const res = http.get(`${BASE_URL}${endpoint}`);

  check(res, {
    "status is 2xx": (r) => r.status >= 200 && r.status < 300,
  });

  errorRate.add(res.status >= 400);

  // Pas de sleep ou très court pour maximiser la charge
  sleep(0.1);
}
