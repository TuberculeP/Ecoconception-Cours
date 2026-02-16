export interface Author {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  bio: string;
  role: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  articleCount: number;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  authorId: string;
  categoryId: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  views: number;
  likes: number;
  commentsCount: number;
  featured: boolean;
  status: "published" | "draft";
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  comment: string;
  rating: number;
  featured: boolean;
}

export interface Statistic {
  id: string;
  label: string;
  value: string;
  description: string;
  icon: string;
}

export const authors: Author[] = [
  {
    id: "author-1",
    firstName: "Marie",
    lastName: "Dubois",
    avatar: "https://i.pravatar.cc/150?img=1",
    bio: "Développeuse full-stack passionnée par les nouvelles technologies et l'éco-conception web. Plus de 10 ans d'expérience dans le développement d'applications performantes.",
    role: "Lead Developer",
    social: {
      twitter: "mariedubois",
      linkedin: "mariedubois",
      github: "mariedubois",
    },
  },
  {
    id: "author-2",
    firstName: "Thomas",
    lastName: "Martin",
    avatar: "https://i.pravatar.cc/150?img=3",
    bio: "Expert en architecture logicielle et DevOps. Contributeur open source et speaker régulier dans les conférences tech françaises et internationales.",
    role: "Solutions Architect",
    social: {
      twitter: "thomasmartin",
      github: "thomasmartin",
    },
  },
  {
    id: "author-3",
    firstName: "Sophie",
    lastName: "Bernard",
    avatar: "https://i.pravatar.cc/150?img=5",
    bio: "UX Designer et spécialiste en accessibilité web. Passionnée par la création d'interfaces inclusives et intuitives pour tous les utilisateurs.",
    role: "Senior UX Designer",
    social: {
      linkedin: "sophiebernard",
      twitter: "sophiebernard",
    },
  },
  {
    id: "author-4",
    firstName: "Lucas",
    lastName: "Petit",
    avatar: "https://i.pravatar.cc/150?img=8",
    bio: "Ingénieur performance et optimisation. Spécialisé dans l'amélioration des Core Web Vitals et les stratégies de mise en cache avancées.",
    role: "Performance Engineer",
    social: {
      github: "lucaspetit",
      twitter: "lucaspetit",
    },
  },
  {
    id: "author-5",
    firstName: "Emma",
    lastName: "Laurent",
    avatar: "https://i.pravatar.cc/150?img=9",
    bio: "Experte en sécurité applicative et DevSecOps. Formatrice certifiée OWASP et consultante en cybersécurité pour les startups et grandes entreprises.",
    role: "Security Engineer",
    social: {
      linkedin: "emmalaurent",
      github: "emmalaurent",
    },
  },
];

export const categories: Category[] = [
  {
    id: "cat-1",
    name: "Performance Web",
    slug: "performance-web",
    description:
      "Optimisation des temps de chargement, Core Web Vitals, et bonnes pratiques de performance.",
    color: "#3B82F6",
    articleCount: 12,
  },
  {
    id: "cat-2",
    name: "Éco-conception",
    slug: "eco-conception",
    description:
      "Développement durable, réduction de l'empreinte carbone numérique et design responsable.",
    color: "#10B981",
    articleCount: 8,
  },
  {
    id: "cat-3",
    name: "Accessibilité",
    slug: "accessibilite",
    description:
      "WCAG, ARIA, et techniques pour rendre le web accessible à tous.",
    color: "#8B5CF6",
    articleCount: 6,
  },
  {
    id: "cat-4",
    name: "JavaScript",
    slug: "javascript",
    description:
      "Tutoriels, frameworks modernes et patterns avancés en JavaScript et TypeScript.",
    color: "#F59E0B",
    articleCount: 15,
  },
  {
    id: "cat-5",
    name: "DevOps",
    slug: "devops",
    description: "CI/CD, conteneurisation, orchestration et culture DevOps.",
    color: "#EF4444",
    articleCount: 9,
  },
  {
    id: "cat-6",
    name: "Sécurité",
    slug: "securite",
    description:
      "Bonnes pratiques de sécurité, OWASP Top 10 et protection des applications web.",
    color: "#EC4899",
    articleCount: 7,
  },
];

export const articles: Article[] = [
  {
    id: "article-1",
    title: "Optimiser les Core Web Vitals : Guide complet pour 2026",
    slug: "optimiser-core-web-vitals-guide-2026",
    excerpt:
      "Découvrez les techniques avancées pour améliorer vos scores Lighthouse et offrir une expérience utilisateur optimale. Un guide exhaustif des meilleures pratiques.",
    content: `
# Optimiser les Core Web Vitals : Guide complet pour 2026

Les Core Web Vitals sont devenus un facteur de classement essentiel pour Google. Dans cet article, nous allons explorer en profondeur les trois métriques principales et comment les optimiser efficacement.

## Comprendre les métriques

### Largest Contentful Paint (LCP)

Le LCP mesure le temps de chargement du plus grand élément visible dans la fenêtre d'affichage. Pour obtenir un bon score, votre LCP doit être inférieur à 2,5 secondes.

**Techniques d'optimisation :**

- Optimisez vos images avec des formats modernes (WebP, AVIF)
- Utilisez le lazy loading pour les images hors écran
- Préchargez les ressources critiques avec \`<link rel="preload">\`
- Minimisez le CSS bloquant le rendu

### First Input Delay (FID) / Interaction to Next Paint (INP)

Cette métrique mesure la réactivité de votre page aux interactions utilisateur. Un bon score INP est inférieur à 200ms.

**Stratégies d'amélioration :**

\`\`\`javascript
// Utilisez requestIdleCallback pour les tâches non critiques
requestIdleCallback(() => {
  // Tâches de faible priorité
  analytics.track('page_view');
  loadNonCriticalResources();
});

// Fractionnez les longues tâches
function processLargeArray(items) {
  const CHUNK_SIZE = 100;
  let index = 0;

  function processChunk() {
    const chunk = items.slice(index, index + CHUNK_SIZE);
    chunk.forEach(processItem);
    index += CHUNK_SIZE;

    if (index < items.length) {
      requestAnimationFrame(processChunk);
    }
  }

  processChunk();
}
\`\`\`

### Cumulative Layout Shift (CLS)

Le CLS mesure la stabilité visuelle de votre page. Un bon score est inférieur à 0,1.

**Bonnes pratiques :**

- Définissez toujours les dimensions des images et vidéos
- Réservez l'espace pour les publicités et embeds
- Évitez d'insérer du contenu au-dessus du contenu existant

## Outils de mesure

1. **Lighthouse** - Audit complet dans Chrome DevTools
2. **PageSpeed Insights** - Données terrain et laboratoire
3. **Web Vitals Extension** - Monitoring en temps réel
4. **Chrome UX Report** - Données réelles d'utilisateurs

## Conclusion

L'optimisation des Core Web Vitals est un processus continu. Mesurez régulièrement, identifiez les goulots d'étranglement et itérez sur vos améliorations.
    `,
    coverImage: "https://picsum.photos/seed/article1/1200/630",
    authorId: "author-4",
    categoryId: "cat-1",
    tags: [
      "performance",
      "lighthouse",
      "core-web-vitals",
      "seo",
      "optimisation",
    ],
    publishedAt: "2026-02-15T10:00:00Z",
    updatedAt: "2026-02-15T10:00:00Z",
    readTime: 12,
    views: 15420,
    likes: 892,
    commentsCount: 67,
    featured: true,
    status: "published",
  },
  {
    id: "article-2",
    title: "Éco-conception web : Réduire l'empreinte carbone de vos sites",
    slug: "eco-conception-web-empreinte-carbone",
    excerpt:
      "L'impact environnemental du numérique est considérable. Apprenez à concevoir des sites web plus sobres et respectueux de l'environnement.",
    content: `
# Éco-conception web : Réduire l'empreinte carbone de vos sites

Le numérique représente aujourd'hui environ 4% des émissions mondiales de gaz à effet de serre, un chiffre en constante augmentation. En tant que développeurs, nous avons un rôle crucial à jouer.

## L'impact environnemental du web

Une page web moyenne pèse aujourd'hui plus de 2 Mo, contre 500 Ko il y a 10 ans. Cette inflation a des conséquences directes :

- Consommation énergétique des serveurs
- Transfert de données sur les réseaux
- Consommation des appareils clients
- Renouvellement prématuré des équipements

## Principes de l'éco-conception

### 1. Sobriété fonctionnelle

Avant de développer une fonctionnalité, posez-vous la question : est-elle vraiment nécessaire ?

\`\`\`javascript
// ❌ Animation superflue
const particles = new ParticleSystem({
  count: 10000,
  animation: 'continuous'
});

// ✅ Animation sobre et utile
const notification = {
  show: (message) => {
    element.textContent = message;
    element.classList.add('visible');
  }
};
\`\`\`

### 2. Optimisation des images

Les images représentent souvent 50% du poids d'une page.

**Checklist :**
- [ ] Format moderne (WebP, AVIF)
- [ ] Compression optimale
- [ ] Dimensions adaptées (srcset)
- [ ] Lazy loading
- [ ] Placeholder léger

### 3. Mise en cache efficace

\`\`\`nginx
# Configuration Nginx optimale
location ~* \\.(css|js|png|jpg|webp|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
\`\`\`

### 4. Hébergement vert

Choisissez un hébergeur alimenté en énergies renouvelables. Consultez le Green Web Directory pour trouver des alternatives.

## Mesurer son impact

Utilisez des outils comme :
- Website Carbon Calculator
- Ecograder
- GreenIT Analysis (extension)

## Conclusion

Chaque Ko économisé compte. L'éco-conception n'est pas seulement bonne pour la planète, elle améliore aussi l'expérience utilisateur et le référencement.
    `,
    coverImage: "https://picsum.photos/seed/article2/1200/630",
    authorId: "author-1",
    categoryId: "cat-2",
    tags: ["eco-conception", "green-it", "sobriete-numerique", "environnement"],
    publishedAt: "2026-02-12T14:30:00Z",
    updatedAt: "2026-02-13T09:15:00Z",
    readTime: 10,
    views: 8934,
    likes: 654,
    commentsCount: 43,
    featured: true,
    status: "published",
  },
  {
    id: "article-3",
    title: "Accessibilité web : Les erreurs les plus courantes à éviter",
    slug: "accessibilite-web-erreurs-courantes",
    excerpt:
      "L'accessibilité n'est pas optionnelle. Découvrez les erreurs fréquentes qui rendent vos sites inaccessibles et comment les corriger.",
    content: `
# Accessibilité web : Les erreurs les plus courantes à éviter

15% de la population mondiale vit avec un handicap. Rendre nos sites accessibles n'est pas seulement une obligation légale, c'est une responsabilité éthique.

## Les 10 erreurs les plus fréquentes

### 1. Images sans texte alternatif

\`\`\`html
<!-- ❌ Mauvais -->
<img src="graphique-ventes.png">

<!-- ✅ Bon -->
<img src="graphique-ventes.png" alt="Graphique montrant une augmentation des ventes de 25% au T4 2025">

<!-- ✅ Image décorative -->
<img src="decoration.png" alt="" role="presentation">
\`\`\`

### 2. Contraste insuffisant

Le ratio de contraste minimum est de 4.5:1 pour le texte normal et 3:1 pour le grand texte.

\`\`\`css
/* ❌ Contraste insuffisant */
.text {
  color: #999;
  background: #fff;
}

/* ✅ Contraste suffisant */
.text {
  color: #595959;
  background: #fff;
}
\`\`\`

### 3. Navigation au clavier impossible

\`\`\`javascript
// ❌ Click seulement
div.addEventListener('click', handler);

// ✅ Accessible au clavier
button.addEventListener('click', handler);
button.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    handler(e);
  }
});
\`\`\`

### 4. Formulaires sans labels

\`\`\`html
<!-- ❌ Sans label -->
<input type="email" placeholder="Email">

<!-- ✅ Avec label -->
<label for="email">Adresse email</label>
<input type="email" id="email" placeholder="exemple@email.com">
\`\`\`

### 5. Structure de titres incohérente

Les titres doivent suivre une hiérarchie logique (h1 → h2 → h3).

### 6. Absence de skip links

\`\`\`html
<a href="#main-content" class="skip-link">
  Aller au contenu principal
</a>
\`\`\`

### 7. Contenu dynamique non annoncé

\`\`\`html
<div aria-live="polite" aria-atomic="true">
  <!-- Contenu mis à jour dynamiquement -->
</div>
\`\`\`

## Outils de test

- axe DevTools
- WAVE
- Lighthouse Accessibility
- VoiceOver / NVDA

## Conclusion

L'accessibilité bénéficie à tous. Un site accessible est souvent mieux référencé, plus performant et offre une meilleure expérience utilisateur.
    `,
    coverImage: "https://picsum.photos/seed/article3/1200/630",
    authorId: "author-3",
    categoryId: "cat-3",
    tags: ["accessibilite", "wcag", "aria", "inclusive-design", "a11y"],
    publishedAt: "2026-02-10T09:00:00Z",
    updatedAt: "2026-02-10T09:00:00Z",
    readTime: 8,
    views: 6721,
    likes: 512,
    commentsCount: 38,
    featured: false,
    status: "published",
  },
  {
    id: "article-4",
    title: "Vue 3 Composition API : Patterns avancés et bonnes pratiques",
    slug: "vue3-composition-api-patterns-avances",
    excerpt:
      "Maîtrisez la Composition API de Vue 3 avec des patterns éprouvés pour créer des applications maintenables et performantes.",
    content: `
# Vue 3 Composition API : Patterns avancés et bonnes pratiques

La Composition API de Vue 3 offre une flexibilité inégalée pour organiser et réutiliser la logique de vos composants.

## Pourquoi la Composition API ?

- Meilleure organisation du code par fonctionnalité
- Réutilisation facilitée avec les composables
- Excellent support TypeScript
- Tree-shaking optimisé

## Les composables : votre nouvelle arme secrète

### Pattern de base

\`\`\`typescript
// composables/useCounter.ts
import { ref, computed } from 'vue';

export function useCounter(initialValue = 0) {
  const count = ref(initialValue);
  const doubled = computed(() => count.value * 2);

  function increment() {
    count.value++;
  }

  function decrement() {
    count.value--;
  }

  function reset() {
    count.value = initialValue;
  }

  return {
    count,
    doubled,
    increment,
    decrement,
    reset
  };
}
\`\`\`

### Composable avec API

\`\`\`typescript
// composables/useApi.ts
import { ref, shallowRef } from 'vue';

interface UseApiOptions<T> {
  immediate?: boolean;
  initialData?: T;
}

export function useApi<T>(
  fetcher: () => Promise<T>,
  options: UseApiOptions<T> = {}
) {
  const { immediate = true, initialData } = options;

  const data = shallowRef<T | undefined>(initialData);
  const error = ref<Error | null>(null);
  const loading = ref(false);

  async function execute() {
    loading.value = true;
    error.value = null;

    try {
      data.value = await fetcher();
    } catch (e) {
      error.value = e as Error;
    } finally {
      loading.value = false;
    }
  }

  if (immediate) {
    execute();
  }

  return {
    data,
    error,
    loading,
    execute,
    refresh: execute
  };
}
\`\`\`

### Utilisation

\`\`\`vue
<script setup lang="ts">
import { useApi } from '@/composables/useApi';
import { useCounter } from '@/composables/useCounter';

const { count, increment } = useCounter(10);

const { data: users, loading, error, refresh } = useApi(
  () => fetch('/api/users').then(r => r.json())
);
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">+1</button>

    <div v-if="loading">Chargement...</div>
    <div v-else-if="error">Erreur: {{ error.message }}</div>
    <ul v-else>
      <li v-for="user in users" :key="user.id">
        {{ user.name }}
      </li>
    </ul>
    <button @click="refresh">Rafraîchir</button>
  </div>
</template>
\`\`\`

## Provide/Inject avec TypeScript

\`\`\`typescript
// types/injection-keys.ts
import type { InjectionKey } from 'vue';

export interface ThemeContext {
  theme: Ref<'light' | 'dark'>;
  toggle: () => void;
}

export const ThemeKey: InjectionKey<ThemeContext> = Symbol('theme');
\`\`\`

## Conclusion

La Composition API est un outil puissant. Utilisez-la pour créer des abstractions réutilisables et maintenables.
    `,
    coverImage: "https://picsum.photos/seed/article4/1200/630",
    authorId: "author-1",
    categoryId: "cat-4",
    tags: ["vue", "vue3", "composition-api", "typescript", "javascript"],
    publishedAt: "2026-02-08T11:00:00Z",
    updatedAt: "2026-02-09T16:45:00Z",
    readTime: 15,
    views: 12543,
    likes: 1023,
    commentsCount: 89,
    featured: true,
    status: "published",
  },
  {
    id: "article-5",
    title: "Docker en production : Les 15 bonnes pratiques essentielles",
    slug: "docker-production-bonnes-pratiques",
    excerpt:
      "Déployez vos conteneurs Docker en production en toute sérénité grâce à ces bonnes pratiques éprouvées par les équipes DevOps.",
    content: `
# Docker en production : Les 15 bonnes pratiques essentielles

Docker est devenu incontournable, mais le passage en production nécessite une approche rigoureuse.

## 1. Utilisez des images de base officielles et légères

\`\`\`dockerfile
# ❌ Image lourde
FROM ubuntu:latest

# ✅ Image légère et spécialisée
FROM node:20-alpine
\`\`\`

## 2. Multi-stage builds

\`\`\`dockerfile
# Stage de build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage de production
FROM node:20-alpine AS production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/main.js"]
\`\`\`

## 3. Ne jamais utiliser root

\`\`\`dockerfile
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs
\`\`\`

## 4. Ordonnez vos instructions pour optimiser le cache

\`\`\`dockerfile
# Les fichiers qui changent le moins en premier
COPY package*.json ./
RUN npm ci

# Puis les fichiers qui changent souvent
COPY . .
\`\`\`

## 5. Utilisez .dockerignore

\`\`\`
node_modules
.git
*.md
.env*
coverage
.nyc_output
\`\`\`

## 6. Health checks

\`\`\`dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:3000/health || exit 1
\`\`\`

## 7. Limitez les ressources

\`\`\`yaml
# docker-compose.yml
services:
  app:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          memory: 256M
\`\`\`

## 8. Logs en JSON

\`\`\`javascript
// Utilisez un logger structuré
logger.info({
  event: 'request',
  method: req.method,
  path: req.path,
  duration: ms
});
\`\`\`

## 9. Gestion des secrets

\`\`\`yaml
services:
  app:
    secrets:
      - db_password
    environment:
      - DB_PASSWORD_FILE=/run/secrets/db_password

secrets:
  db_password:
    external: true
\`\`\`

## 10. Scan de vulnérabilités

\`\`\`bash
# Avec Trivy
trivy image myapp:latest

# Avec Docker Scout
docker scout cves myapp:latest
\`\`\`

## Conclusion

Un conteneur bien configuré est la base d'un déploiement réussi. Prenez le temps de suivre ces bonnes pratiques.
    `,
    coverImage: "https://picsum.photos/seed/article5/1200/630",
    authorId: "author-2",
    categoryId: "cat-5",
    tags: ["docker", "devops", "conteneurisation", "production", "kubernetes"],
    publishedAt: "2026-02-05T08:30:00Z",
    updatedAt: "2026-02-06T14:20:00Z",
    readTime: 14,
    views: 9876,
    likes: 743,
    commentsCount: 52,
    featured: false,
    status: "published",
  },
  {
    id: "article-6",
    title: "Sécurité des API REST : Guide complet OWASP 2026",
    slug: "securite-api-rest-owasp-2026",
    excerpt:
      "Protégez vos API REST contre les attaques les plus courantes. Un guide basé sur les recommandations OWASP actualisées.",
    content: `
# Sécurité des API REST : Guide complet OWASP 2026

Les API sont devenues la cible principale des attaquants. Voici comment les protéger efficacement.

## OWASP API Security Top 10

### 1. Broken Object Level Authorization (BOLA)

\`\`\`javascript
// ❌ Vulnérable
app.get('/api/users/:id/data', (req, res) => {
  const data = db.getUserData(req.params.id);
  res.json(data);
});

// ✅ Sécurisé
app.get('/api/users/:id/data', authenticate, (req, res) => {
  if (req.user.id !== req.params.id && !req.user.isAdmin) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const data = db.getUserData(req.params.id);
  res.json(data);
});
\`\`\`

### 2. Broken Authentication

\`\`\`javascript
// Configuration JWT sécurisée
const token = jwt.sign(
  { userId: user.id, role: user.role },
  process.env.JWT_SECRET,
  {
    expiresIn: '15m',
    algorithm: 'RS256',
    issuer: 'your-app',
    audience: 'your-app-users'
  }
);
\`\`\`

### 3. Rate Limiting

\`\`\`javascript
import rateLimit from 'express-rate-limit';

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: 'Too many requests' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', apiLimiter);
\`\`\`

### 4. Validation des entrées

\`\`\`typescript
import { z } from 'zod';

const UserSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(12).max(128),
  name: z.string().min(1).max(100).regex(/^[a-zA-Z\\s]+$/),
});

app.post('/api/users', (req, res) => {
  const result = UserSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.issues });
  }
  // Continuer avec des données validées
});
\`\`\`

### 5. Headers de sécurité

\`\`\`javascript
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
\`\`\`

## Audit et monitoring

\`\`\`javascript
// Logging des événements de sécurité
function logSecurityEvent(event) {
  logger.warn({
    type: 'security',
    event: event.type,
    ip: event.ip,
    userId: event.userId,
    timestamp: new Date().toISOString(),
    details: event.details
  });
}
\`\`\`

## Conclusion

La sécurité est un processus continu. Formez vos équipes, automatisez les tests de sécurité et restez informés des nouvelles vulnérabilités.
    `,
    coverImage: "https://picsum.photos/seed/article6/1200/630",
    authorId: "author-5",
    categoryId: "cat-6",
    tags: ["securite", "api", "owasp", "authentication", "jwt"],
    publishedAt: "2026-02-03T13:00:00Z",
    updatedAt: "2026-02-04T10:30:00Z",
    readTime: 11,
    views: 7654,
    likes: 589,
    commentsCount: 41,
    featured: false,
    status: "published",
  },
  {
    id: "article-7",
    title: "TypeScript 5.4 : Les nouvelles fonctionnalités incontournables",
    slug: "typescript-54-nouvelles-fonctionnalites",
    excerpt:
      "Découvrez les dernières nouveautés de TypeScript 5.4 qui vont améliorer votre productivité et la qualité de votre code.",
    content: `
# TypeScript 5.4 : Les nouvelles fonctionnalités incontournables

TypeScript continue d'évoluer pour offrir une meilleure expérience développeur. Voici les nouveautés de la version 5.4.

## Preserved Narrowing in Closures

\`\`\`typescript
function processValue(value: string | number) {
  if (typeof value === 'string') {
    // TypeScript 5.4 préserve le narrowing dans les closures
    setTimeout(() => {
      console.log(value.toUpperCase()); // ✅ Fonctionne maintenant
    }, 100);
  }
}
\`\`\`

## NoInfer Utility Type

\`\`\`typescript
function createState<T>(initial: NoInfer<T>): State<T> {
  // Empêche l'inférence depuis initial
  return { value: initial };
}

// Force à spécifier le type explicitement
const state = createState<string>('hello');
\`\`\`

## Améliorations des Template Literal Types

\`\`\`typescript
type Route = \`/api/\${string}\`;
type Version = \`v\${number}\`;

function fetchApi(route: Route, version: Version) {
  // ...
}

fetchApi('/api/users', 'v2'); // ✅
fetchApi('/users', 'v2'); // ❌ Error
\`\`\`

## Meilleur support des Enums

\`\`\`typescript
enum Status {
  Pending = 'PENDING',
  Active = 'ACTIVE',
  Completed = 'COMPLETED'
}

function processStatus(status: Status) {
  // Exhaustiveness checking amélioré
  switch (status) {
    case Status.Pending:
      return 'En attente';
    case Status.Active:
      return 'Actif';
    case Status.Completed:
      return 'Terminé';
  }
}
\`\`\`

## Performance améliorée

- Compilation incrémentale plus rapide
- Meilleure gestion de la mémoire
- Réduction du temps de build de 10-25%

## Configuration recommandée

\`\`\`json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "verbatimModuleSyntax": true
  }
}
\`\`\`

## Conclusion

TypeScript 5.4 apporte des améliorations significatives. Mettez à jour vos projets pour en bénéficier.
    `,
    coverImage: "https://picsum.photos/seed/article7/1200/630",
    authorId: "author-2",
    categoryId: "cat-4",
    tags: ["typescript", "javascript", "types", "developpement"],
    publishedAt: "2026-01-30T10:00:00Z",
    updatedAt: "2026-01-30T10:00:00Z",
    readTime: 9,
    views: 11234,
    likes: 876,
    commentsCount: 63,
    featured: false,
    status: "published",
  },
  {
    id: "article-8",
    title: "Lazy Loading avancé : Au-delà des images",
    slug: "lazy-loading-avance-composants",
    excerpt:
      "Le lazy loading ne se limite pas aux images. Découvrez comment l'appliquer aux composants, routes et données pour des performances optimales.",
    content: `
# Lazy Loading avancé : Au-delà des images

Le lazy loading est une technique essentielle pour améliorer les performances. Voyons comment l'étendre à tous les aspects de votre application.

## Lazy Loading de composants Vue

\`\`\`typescript
// router.ts
const routes = [
  {
    path: '/dashboard',
    component: () => import('./views/Dashboard.vue'),
    children: [
      {
        path: 'analytics',
        component: () => import('./views/Analytics.vue')
      }
    ]
  }
];
\`\`\`

## Suspense et composants asynchrones

\`\`\`vue
<template>
  <Suspense>
    <template #default>
      <HeavyChart :data="chartData" />
    </template>
    <template #fallback>
      <ChartSkeleton />
    </template>
  </Suspense>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';

const HeavyChart = defineAsyncComponent({
  loader: () => import('./HeavyChart.vue'),
  loadingComponent: ChartSkeleton,
  delay: 200,
  timeout: 10000
});
</script>
\`\`\`

## Intersection Observer pour le chargement conditionnel

\`\`\`typescript
// composables/useLazyLoad.ts
export function useLazyLoad(callback: () => void) {
  const elementRef = ref<HTMLElement>();
  const isVisible = ref(false);

  onMounted(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          callback();
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    if (elementRef.value) {
      observer.observe(elementRef.value);
    }
  });

  return { elementRef, isVisible };
}
\`\`\`

## Prefetching intelligent

\`\`\`typescript
// Précharger au hover
function prefetchOnHover(route: string) {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = route;
  document.head.appendChild(link);
}

// Utilisation
onMounted(() => {
  const links = document.querySelectorAll('a[data-prefetch]');
  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      prefetchOnHover(link.getAttribute('href'));
    }, { once: true });
  });
});
\`\`\`

## Virtualisation des listes

\`\`\`vue
<template>
  <VirtualList
    :items="items"
    :item-height="60"
    :visible-items="10"
  >
    <template #item="{ item }">
      <ListItem :data="item" />
    </template>
  </VirtualList>
</template>
\`\`\`

## Conclusion

Le lazy loading intelligent peut réduire le temps de chargement initial de 50% ou plus. Appliquez-le stratégiquement là où cela a le plus d'impact.
    `,
    coverImage: "https://picsum.photos/seed/article8/1200/630",
    authorId: "author-4",
    categoryId: "cat-1",
    tags: ["performance", "lazy-loading", "vue", "optimisation", "ux"],
    publishedAt: "2026-01-28T14:00:00Z",
    updatedAt: "2026-01-29T09:00:00Z",
    readTime: 10,
    views: 8432,
    likes: 621,
    commentsCount: 47,
    featured: false,
    status: "published",
  },
  {
    id: "article-9",
    title: "CI/CD avec GitHub Actions : Pipeline complet pour Vue.js",
    slug: "cicd-github-actions-vuejs",
    excerpt:
      "Configurez un pipeline CI/CD robuste avec GitHub Actions pour vos projets Vue.js. Tests, build, preview et déploiement automatisés.",
    content: `
# CI/CD avec GitHub Actions : Pipeline complet pour Vue.js

Automatisez entièrement votre workflow de développement avec GitHub Actions.

## Structure du workflow

\`\`\`yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '20'

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: 'npm'
      - run: npm ci
      - run: npm run lint

  test:
    runs-on: ubuntu-latest
    needs: lint
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: 'npm'
      - run: npm ci
      - run: npm run test:coverage
      - uses: codecov/codecov-action@v4
        with:
          files: ./coverage/lcov.info

  build:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/

  deploy-preview:
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: dist
          path: dist/
      - uses: nwtgck/actions-netlify@v3
        with:
          publish-dir: './dist'
          github-token: \${{ secrets.GITHUB_TOKEN }}
          deploy-message: 'Preview Deploy from PR #\${{ github.event.pull_request.number }}'
        env:
          NETLIFY_AUTH_TOKEN: \${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: \${{ secrets.NETLIFY_SITE_ID }}

  deploy-production:
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    needs: build
    environment: production
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: dist
          path: dist/
      - run: |
          # Deploy to production
          echo "Deploying to production..."
\`\`\`

## Tests E2E avec Playwright

\`\`\`yaml
  e2e:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ env.NODE_VERSION }}
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
\`\`\`

## Sécurité et secrets

Utilisez les environnements GitHub pour gérer les secrets de production :

- Settings → Environments → New environment
- Ajoutez des reviewers requis pour la production
- Configurez les secrets spécifiques à chaque environnement

## Conclusion

Un bon pipeline CI/CD vous fait gagner des heures chaque semaine et améliore la qualité de vos livrables.
    `,
    coverImage: "https://picsum.photos/seed/article9/1200/630",
    authorId: "author-2",
    categoryId: "cat-5",
    tags: ["devops", "cicd", "github-actions", "vue", "automation"],
    publishedAt: "2026-01-25T11:00:00Z",
    updatedAt: "2026-01-26T15:30:00Z",
    readTime: 13,
    views: 7890,
    likes: 598,
    commentsCount: 34,
    featured: false,
    status: "published",
  },
  {
    id: "article-10",
    title: "Design System avec Tailwind CSS et Vue 3",
    slug: "design-system-tailwind-vue3",
    excerpt:
      "Créez un design system cohérent et maintenable en combinant la puissance de Tailwind CSS avec les composants Vue 3.",
    content: `
# Design System avec Tailwind CSS et Vue 3

Un design system bien conçu accélère le développement et garantit la cohérence visuelle.

## Configuration Tailwind

\`\`\`javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        }
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ]
}
\`\`\`

## Composant Button

\`\`\`vue
<!-- components/ui/Button.vue -->
<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-brand-600 text-white hover:bg-brand-700',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
        outline: 'border border-gray-300 bg-transparent hover:bg-gray-100',
        ghost: 'hover:bg-gray-100',
        destructive: 'bg-red-600 text-white hover:bg-red-700',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface Props {
  variant?: ButtonVariants['variant'];
  size?: ButtonVariants['size'];
  disabled?: boolean;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
});
</script>

<template>
  <button
    :class="buttonVariants({ variant, size })"
    :disabled="disabled || loading"
  >
    <Loader2 v-if="loading" class="mr-2 h-4 w-4 animate-spin" />
    <slot />
  </button>
</template>
\`\`\`

## Tokens de design

\`\`\`typescript
// design-tokens.ts
export const tokens = {
  colors: {
    primary: 'var(--color-brand-600)',
    secondary: 'var(--color-gray-600)',
    success: 'var(--color-green-600)',
    warning: 'var(--color-yellow-600)',
    error: 'var(--color-red-600)',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  radii: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    full: '9999px',
  },
};
\`\`\`

## Conclusion

Un design system évolue avec votre produit. Documentez-le, testez-le visuellement et itérez régulièrement.
    `,
    coverImage: "https://picsum.photos/seed/article10/1200/630",
    authorId: "author-3",
    categoryId: "cat-4",
    tags: ["design-system", "tailwind", "vue", "ui", "composants"],
    publishedAt: "2026-01-22T09:00:00Z",
    updatedAt: "2026-01-23T11:00:00Z",
    readTime: 11,
    views: 9543,
    likes: 712,
    commentsCount: 56,
    featured: false,
    status: "published",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "Jean-Pierre Lefebvre",
    role: "CTO",
    company: "TechStart SAS",
    avatar: "https://i.pravatar.cc/150?img=11",
    comment:
      "Cette plateforme a transformé notre façon de travailler. La productivité de notre équipe a augmenté de 40% en seulement 3 mois. L'interface est intuitive et les fonctionnalités répondent parfaitement à nos besoins.",
    rating: 5,
    featured: true,
  },
  {
    id: "testimonial-2",
    name: "Amélie Rousseau",
    role: "Lead Developer",
    company: "InnoSoft",
    avatar: "https://i.pravatar.cc/150?img=12",
    comment:
      "L'API est incroyablement bien documentée et les performances sont au rendez-vous. Notre temps de développement a été réduit de moitié grâce aux outils fournis.",
    rating: 5,
    featured: true,
  },
  {
    id: "testimonial-3",
    name: "Marc Durand",
    role: "Product Manager",
    company: "DigitalCorp",
    avatar: "https://i.pravatar.cc/150?img=13",
    comment:
      "Le support client est exceptionnel. Chaque fois que j'ai eu une question, j'ai obtenu une réponse rapide et pertinente. C'est rare de voir un tel niveau d'engagement.",
    rating: 5,
    featured: true,
  },
  {
    id: "testimonial-4",
    name: "Claire Martin",
    role: "Freelance Developer",
    company: "Indépendante",
    avatar: "https://i.pravatar.cc/150?img=14",
    comment:
      "En tant que freelance, cette plateforme me fait gagner un temps précieux sur chaque projet. Les templates et composants prêts à l'emploi sont d'une qualité remarquable.",
    rating: 4,
    featured: false,
  },
  {
    id: "testimonial-5",
    name: "Nicolas Bernard",
    role: "CEO",
    company: "WebAgency Pro",
    avatar: "https://i.pravatar.cc/150?img=15",
    comment:
      "Nous avons migré tous nos projets sur cette plateforme. La stabilité et les performances sont remarquables, même avec des pics de trafic importants.",
    rating: 5,
    featured: true,
  },
  {
    id: "testimonial-6",
    name: "Isabelle Petit",
    role: "Startup Founder",
    company: "GreenTech Solutions",
    avatar: "https://i.pravatar.cc/150?img=16",
    comment:
      "Le rapport qualité-prix est imbattable. Toutes les fonctionnalités dont on a besoin à un prix accessible pour une startup. Je recommande vivement.",
    rating: 5,
    featured: false,
  },
  {
    id: "testimonial-7",
    name: "Philippe Moreau",
    role: "Tech Lead",
    company: "E-Commerce Plus",
    avatar: "https://i.pravatar.cc/150?img=17",
    comment:
      "L'intégration avec nos outils existants s'est faite sans accroc. L'équipe technique a été d'une grande aide pendant la phase de migration.",
    rating: 4,
    featured: false,
  },
  {
    id: "testimonial-8",
    name: "Sandrine Leroy",
    role: "DevOps Engineer",
    company: "CloudFirst",
    avatar: "https://i.pravatar.cc/150?img=18",
    comment:
      "Les pipelines CI/CD intégrés nous ont permis d'automatiser entièrement nos déploiements. C'est un gain de temps considérable au quotidien.",
    rating: 5,
    featured: true,
  },
];

export const statistics: Statistic[] = [
  {
    id: "stat-1",
    label: "Utilisateurs actifs",
    value: "15,000+",
    description:
      "Développeurs et entreprises font confiance à notre plateforme",
    icon: "users",
  },
  {
    id: "stat-2",
    label: "Projets créés",
    value: "50,000+",
    description: "Applications et sites web déployés avec succès",
    icon: "folder",
  },
  {
    id: "stat-3",
    label: "Satisfaction client",
    value: "98%",
    description: "Taux de satisfaction basé sur les retours utilisateurs",
    icon: "heart",
  },
  {
    id: "stat-4",
    label: "Temps de réponse",
    value: "<2h",
    description: "Temps moyen de réponse de notre support technique",
    icon: "clock",
  },
  {
    id: "stat-5",
    label: "Uptime",
    value: "99.99%",
    description: "Disponibilité garantie de notre infrastructure",
    icon: "server",
  },
  {
    id: "stat-6",
    label: "Pays",
    value: "45+",
    description: "Présence internationale et support multilingue",
    icon: "globe",
  },
];

export function getArticleById(id: string): Article | undefined {
  return articles.find((a) => a.id === id);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getAuthorById(id: string): Author | undefined {
  return authors.find((a) => a.id === id);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getArticlesByCategory(categoryId: string): Article[] {
  return articles.filter(
    (a) => a.categoryId === categoryId && a.status === "published",
  );
}

export function getArticlesByAuthor(authorId: string): Article[] {
  return articles.filter(
    (a) => a.authorId === authorId && a.status === "published",
  );
}

export function getFeaturedArticles(): Article[] {
  return articles.filter((a) => a.featured && a.status === "published");
}

export function getRecentArticles(limit = 10): Article[] {
  return articles
    .filter((a) => a.status === "published")
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, limit);
}

export function searchArticles(query: string): Article[] {
  const lowerQuery = query.toLowerCase();
  return articles.filter(
    (a) =>
      a.status === "published" &&
      (a.title.toLowerCase().includes(lowerQuery) ||
        a.excerpt.toLowerCase().includes(lowerQuery) ||
        a.tags.some((t) => t.toLowerCase().includes(lowerQuery))),
  );
}

export function getFeaturedTestimonials(): Testimonial[] {
  return testimonials.filter((t) => t.featured);
}
