# K6 Load Testing pour l'Éco-conception

## Installation de K6

### macOS
```bash
brew install k6
```

### Linux (Debian/Ubuntu)
```bash
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

### Docker
```bash
docker run --rm -i grafana/k6 run - <script.js
```

---

## Scripts disponibles

| Script | Usage | Durée |
|--------|-------|-------|
| `smoke-test.js` | Vérification rapide | ~10s |
| `eco-load-test.js` | Test de charge réaliste | ~4min |
| `stress-test.js` | Trouver les limites | ~4.5min |

---

## Utilisation

### 1. Lancer l'infrastructure
```bash
npm run dockerize
```

### 2. Smoke test (vérifier que tout marche)
```bash
k6 run k6/smoke-test.js
```

### 3. Test de charge éco-conception
```bash
# En local (dev)
k6 run k6/eco-load-test.js

# Contre le container Docker
k6 run -e BASE_URL=http://localhost:3000 k6/eco-load-test.js
```

### 4. Stress test (trouver les limites)
```bash
k6 run k6/stress-test.js
```

---

## Métriques à observer dans Grafana

### Pendant le test K6, observer ces queries :

#### Process Node.js (prom-client)
```promql
# CPU du process Express (%)
rate(express_app_process_cpu_seconds_total[1m]) * 100

# RAM du process (MB)
express_app_process_resident_memory_bytes / 1024 / 1024

# Heap utilisé (MB) - plus précis pour Node.js
express_app_nodejs_heap_size_used_bytes / 1024 / 1024

# Event loop lag (problème de perf si > 100ms)
express_app_nodejs_eventloop_lag_seconds * 1000
```

#### Container Docker (cAdvisor)
```promql
# RAM container (MB)
container_memory_usage_bytes{name="express-vue-app"} / 1024 / 1024

# CPU container (cores)
rate(container_cpu_usage_seconds_total{name="express-vue-app"}[1m])
```

#### HTTP Performance
```promql
# Requêtes par seconde
rate(http_requests_total[1m])

# Latence P95
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[1m]))

# Latence P99
histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[1m]))
```

---

## Workflow Éco-conception

### Étape 1 : Baseline
1. Lancer `eco-load-test.js`
2. Noter les métriques max (CPU, RAM, latence)
3. Observer les flamegraphs Pyroscope

### Étape 2 : Identifier les bottlenecks
1. Dans Pyroscope, identifier les fonctions qui consomment le plus
2. Dans Grafana, corréler avec les pics de latence

### Étape 3 : Optimiser
1. Implémenter les optimisations (cache, queries, algorithmes)
2. Relancer le même test K6

### Étape 4 : Comparer
Comparer avant/après :
- CPU moyen et max
- RAM moyenne et max
- Latence P95
- Throughput (req/s)

---

## Exemple de rapport éco-conception

| Métrique | Avant | Après | Amélioration |
|----------|-------|-------|--------------|
| CPU max | 45% | 28% | -38% |
| RAM max | 180MB | 120MB | -33% |
| Latence P95 | 450ms | 120ms | -73% |
| Req/s max | 85 | 140 | +65% |

---

## Variables d'environnement K6

```bash
# URL cible
k6 run -e BASE_URL=http://prod.example.com k6/eco-load-test.js

# Durée custom
k6 run --duration 5m k6/eco-load-test.js

# Plus de VUs
k6 run --vus 50 --duration 2m k6/smoke-test.js
```

---

## Output vers Prometheus (optionnel)

K6 peut envoyer ses métriques vers Prometheus pour les voir dans Grafana :

```bash
k6 run --out experimental-prometheus-rw k6/eco-load-test.js
```

Nécessite de configurer `K6_PROMETHEUS_RW_SERVER_URL`.
