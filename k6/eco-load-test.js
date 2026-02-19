import http from "k6/http";
import { check, sleep } from "k6";
import { Rate, Trend } from "k6/metrics";

// Métriques custom pour l'éco-conception
const errorRate = new Rate("errors");
const articleListDuration = new Trend("article_list_duration");
const articleDetailDuration = new Trend("article_detail_duration");

// Configuration du test
// Les "stages" définissent la montée en charge progressive
export const options = {
  stages: [
    { duration: "30s", target: 10 }, // Montée à 10 VUs en 30s
    { duration: "1m", target: 20 }, // Montée à 20 VUs en 1min
    { duration: "2m", target: 20 }, // Maintien à 20 VUs pendant 2min (observer les métriques stables)
    { duration: "30s", target: 0 }, // Descente à 0 VUs
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"], // 95% des requêtes < 500ms
    errors: ["rate<0.1"], // Taux d'erreur < 10%
  },
};

const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";

// Scénario principal : simule un utilisateur qui navigue
export default function () {
  // 1. Page d'accueil / liste des articles (70% du trafic réel)
  const articlesRes = http.get(`${BASE_URL}/api/articles?page=1&limit=10`);
  articleListDuration.add(articlesRes.timings.duration);

  check(articlesRes, {
    "articles list status 200": (r) => r.status === 200,
    "articles list has data": (r) => {
      const body = JSON.parse(r.body);
      return body.data && Array.isArray(body.data);
    },
  });

  errorRate.add(articlesRes.status !== 200);

  // Pause réaliste (utilisateur qui lit la page)
  sleep(Math.random() * 2 + 1); // 1-3 secondes

  // 2. Récupérer les catégories
  const categoriesRes = http.get(`${BASE_URL}/api/articles/categories`);
  check(categoriesRes, {
    "categories status 200": (r) => r.status === 200,
  });

  sleep(0.5);

  // 3. Lecture d'un article (simuler un clic)
  // Dans un vrai test, on récupèrerait un slug depuis la liste
  const articles = JSON.parse(articlesRes.body);
  if (articles.data && articles.data.length > 0) {
    const randomArticle =
      articles.data[Math.floor(Math.random() * articles.data.length)];
    const slug = randomArticle.slug;

    const articleRes = http.get(`${BASE_URL}/api/articles/${slug}`);
    articleDetailDuration.add(articleRes.timings.duration);

    check(articleRes, {
      "article detail status 200": (r) => r.status === 200,
      "article has content": (r) => {
        const body = JSON.parse(r.body);
        return body.data && body.data.content;
      },
    });

    errorRate.add(articleRes.status !== 200);

    // Temps de lecture simulé (plus long)
    sleep(Math.random() * 5 + 3); // 3-8 secondes
  }

  // 4. Pagination (retour à la liste, page suivante)
  const page2Res = http.get(`${BASE_URL}/api/articles?page=2&limit=10`);
  check(page2Res, {
    "page 2 status 200": (r) => r.status === 200,
  });

  sleep(Math.random() * 2 + 1);
}

// Fonction de setup (exécutée une fois au début)
export function setup() {
  // Vérifier que l'app répond
  const healthRes = http.get(`${BASE_URL}/health`);
  if (healthRes.status !== 200) {
    throw new Error(`App not ready: ${healthRes.status}`);
  }
  console.log(`Testing against ${BASE_URL}`);
  return { startTime: new Date().toISOString() };
}

// Fonction de teardown (exécutée une fois à la fin)
export function teardown(data) {
  console.log(`Test started at: ${data.startTime}`);
  console.log(`Test ended at: ${new Date().toISOString()}`);
}
