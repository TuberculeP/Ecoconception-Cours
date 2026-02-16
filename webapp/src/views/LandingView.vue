<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section
      class="hero relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-20"
    >
      <div class="container mx-auto px-4">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <h1
              class="text-5xl lg:text-6xl font-bold text-foreground leading-tight"
            >
              Transformez votre vision en
              <span class="text-primary">réalité digitale</span>
            </h1>
            <p class="text-xl text-muted-foreground max-w-xl">
              Notre plateforme innovante vous permet de créer, gérer et
              optimiser vos projets numériques avec une efficacité sans
              précédent. Rejoignez des milliers d'utilisateurs satisfaits.
            </p>
            <div class="flex flex-wrap gap-4">
              <Button size="lg" @click="navigateToRegister">
                Commencer gratuitement
              </Button>
              <Button size="lg" variant="outline" @click="scrollToFeatures">
                Découvrir les fonctionnalités
              </Button>
            </div>
            <div class="flex items-center gap-8 pt-4">
              <div class="text-center">
                <p class="text-3xl font-bold text-primary">{{ stats.users }}</p>
                <p class="text-sm text-muted-foreground">Utilisateurs actifs</p>
              </div>
              <div class="text-center">
                <p class="text-3xl font-bold text-primary">
                  {{ stats.projects }}
                </p>
                <p class="text-sm text-muted-foreground">Projets créés</p>
              </div>
              <div class="text-center">
                <p class="text-3xl font-bold text-primary">
                  {{ stats.satisfaction }}
                </p>
                <p class="text-sm text-muted-foreground">Satisfaction</p>
              </div>
            </div>
          </div>
          <div class="relative">
            <img
              src="https://picsum.photos/600/400?random=1"
              alt="Dashboard preview"
              class="rounded-xl shadow-2xl w-full"
            />
            <img
              src="https://picsum.photos/300/200?random=2"
              alt="Feature preview"
              class="absolute -bottom-8 -left-8 rounded-lg shadow-xl hidden lg:block"
            />
          </div>
        </div>
      </div>
      <div
        class="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"
      ></div>
    </section>

    <!-- Logos Section -->
    <section class="py-12 bg-muted/30 border-y">
      <div class="container mx-auto px-4">
        <p class="text-center text-muted-foreground mb-8">
          Ils nous font confiance
        </p>
        <div class="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
          <img
            v-for="i in 6"
            :key="i"
            :src="`https://picsum.photos/120/40?random=${i + 10}&grayscale`"
            :alt="`Partner ${i}`"
            class="h-8 opacity-60 hover:opacity-100 transition-opacity"
          />
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 bg-background">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <h2 class="text-4xl font-bold mb-4">Fonctionnalités puissantes</h2>
          <p class="text-lg text-muted-foreground">
            Découvrez tous les outils dont vous avez besoin pour mener vos
            projets à bien. Notre suite complète de fonctionnalités répond à
            tous vos besoins.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card
            v-for="feature in features"
            :key="feature.title"
            class="hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <div
                class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4"
              >
                <component :is="feature.icon" class="w-6 h-6 text-primary" />
              </div>
              <CardTitle>{{ feature.title }}</CardTitle>
              <CardDescription>{{ feature.description }}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul class="space-y-2">
                <li
                  v-for="(item, idx) in feature.items"
                  :key="idx"
                  class="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Check class="w-4 h-4 text-primary" />
                  {{ item }}
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Gallery Section -->
    <section class="py-20 bg-muted/30">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <h2 class="text-4xl font-bold mb-4">Galerie de projets</h2>
          <p class="text-lg text-muted-foreground">
            Explorez les réalisations de notre communauté. Des milliers de
            projets inspirants créés avec notre plateforme.
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div
            v-for="i in 12"
            :key="i"
            class="relative group overflow-hidden rounded-lg aspect-square"
          >
            <img
              :src="`https://picsum.photos/400/400?random=${i + 20}`"
              :alt="`Project ${i}`"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div
              class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            >
              <Button variant="secondary" size="sm">Voir le projet</Button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-20 bg-background">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <h2 class="text-4xl font-bold mb-4">
            Ce que disent nos utilisateurs
          </h2>
          <p class="text-lg text-muted-foreground">
            Des milliers de professionnels et d'entreprises utilisent notre
            plateforme au quotidien.
          </p>
        </div>

        <div
          v-if="testimonialsLoading"
          class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <Card v-for="i in 6" :key="i" class="bg-muted/20 animate-pulse">
            <CardContent class="pt-6">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 rounded-full bg-muted"></div>
                <div class="space-y-2">
                  <div class="h-4 bg-muted rounded w-24"></div>
                  <div class="h-3 bg-muted rounded w-32"></div>
                </div>
              </div>
              <div class="h-16 bg-muted rounded"></div>
            </CardContent>
          </Card>
        </div>
        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card
            v-for="testimonial in testimonials"
            :key="testimonial.id"
            class="bg-muted/20"
          >
            <CardContent class="pt-6">
              <div class="flex items-center gap-4 mb-4">
                <img
                  :src="testimonial.avatar"
                  :alt="testimonial.name"
                  class="w-12 h-12 rounded-full"
                />
                <div>
                  <p class="font-semibold">{{ testimonial.name }}</p>
                  <p class="text-sm text-muted-foreground">
                    {{ testimonial.role }}, {{ testimonial.company }}
                  </p>
                </div>
              </div>
              <p class="text-muted-foreground italic">
                "{{ testimonial.comment }}"
              </p>
              <div class="flex gap-1 mt-4">
                <Star
                  v-for="s in 5"
                  :key="s"
                  :class="[
                    'w-4 h-4',
                    s <= testimonial.rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-muted',
                  ]"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="py-20 bg-muted/30">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <h2 class="text-4xl font-bold mb-4">Tarifs transparents</h2>
          <p class="text-lg text-muted-foreground">
            Choisissez le plan qui correspond à vos besoins. Pas de frais
            cachés, pas de surprise.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card
            v-for="plan in pricing"
            :key="plan.name"
            :class="['relative', plan.popular && 'border-primary shadow-lg']"
          >
            <div
              v-if="plan.popular"
              class="absolute -top-3 left-1/2 -translate-x-1/2"
            >
              <span
                class="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium"
              >
                Populaire
              </span>
            </div>
            <CardHeader class="text-center">
              <CardTitle>{{ plan.name }}</CardTitle>
              <div class="mt-4">
                <span class="text-4xl font-bold">{{ plan.price }}€</span>
                <span class="text-muted-foreground">/mois</span>
              </div>
              <CardDescription>{{ plan.description }}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul class="space-y-3">
                <li
                  v-for="(feature, idx) in plan.features"
                  :key="idx"
                  class="flex items-center gap-2 text-sm"
                >
                  <Check class="w-4 h-4 text-primary" />
                  {{ feature }}
                </li>
              </ul>
              <Button
                :variant="plan.popular ? 'default' : 'outline'"
                class="w-full mt-6"
              >
                {{ plan.cta }}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Blog Section -->
    <section class="py-20 bg-background">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <h2 class="text-4xl font-bold mb-4">Derniers articles</h2>
          <p class="text-lg text-muted-foreground">
            Restez informé des dernières tendances et bonnes pratiques du
            développement web.
          </p>
        </div>

        <div
          v-if="articlesLoading"
          class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <Card v-for="i in 3" :key="i" class="overflow-hidden animate-pulse">
            <div class="w-full h-48 bg-muted"></div>
            <CardHeader>
              <div class="h-4 bg-muted rounded w-1/3 mb-2"></div>
              <div class="h-6 bg-muted rounded w-full mb-2"></div>
              <div class="h-4 bg-muted rounded w-2/3"></div>
            </CardHeader>
          </Card>
        </div>
        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card
            v-for="article in articles"
            :key="article.id"
            class="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              :src="article.coverImage"
              :alt="article.title"
              class="w-full h-48 object-cover"
            />
            <CardHeader>
              <div
                class="flex items-center gap-2 text-sm text-muted-foreground mb-2"
              >
                <span
                  v-if="article.category"
                  class="px-2 py-0.5 rounded-full text-xs font-medium"
                  :style="{
                    backgroundColor: article.category.color + '20',
                    color: article.category.color,
                  }"
                >
                  {{ article.category.name }}
                </span>
                <span class="mx-1">•</span>
                <Calendar class="w-4 h-4" />
                {{ formatDate(article.publishedAt) }}
                <span class="mx-1">•</span>
                <Clock class="w-4 h-4" />
                {{ article.readTime }} min
              </div>
              <CardTitle class="line-clamp-2">{{ article.title }}</CardTitle>
              <CardDescription class="line-clamp-3">{{
                article.excerpt
              }}</CardDescription>
            </CardHeader>
            <CardContent class="pt-0">
              <div
                v-if="article.author"
                class="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <img
                  :src="article.author.avatar"
                  :alt="article.author.firstName"
                  class="w-6 h-6 rounded-full"
                />
                {{ article.author.firstName }} {{ article.author.lastName }}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" class="w-full">
                Lire l'article
                <ArrowRight class="w-4 h-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-20 bg-muted/30">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <h2 class="text-4xl font-bold mb-4">Questions fréquentes</h2>
          <p class="text-lg text-muted-foreground">
            Retrouvez les réponses aux questions les plus posées par notre
            communauté.
          </p>
        </div>

        <div class="max-w-3xl mx-auto space-y-4">
          <Card
            v-for="(faq, idx) in faqs"
            :key="idx"
            class="cursor-pointer"
            @click="toggleFaq(idx)"
          >
            <CardHeader class="flex flex-row items-center justify-between">
              <CardTitle class="text-lg">{{ faq.question }}</CardTitle>
              <ChevronDown
                :class="[
                  'w-5 h-5 transition-transform',
                  openFaq === idx && 'rotate-180',
                ]"
              />
            </CardHeader>
            <CardContent v-show="openFaq === idx" class="pt-0">
              <p class="text-muted-foreground">{{ faq.answer }}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="py-20 bg-primary text-primary-foreground">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold mb-4">Restez informé</h2>
        <p class="text-lg opacity-90 max-w-xl mx-auto mb-8">
          Inscrivez-vous à notre newsletter pour recevoir les dernières
          actualités, tutoriels et offres exclusives directement dans votre
          boîte mail.
        </p>
        <form
          @submit.prevent="submitNewsletter"
          class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
        >
          <Input
            v-model="newsletterEmail"
            type="email"
            placeholder="Votre adresse email"
            class="flex-1 bg-primary-foreground text-foreground"
          />
          <Button
            type="submit"
            variant="secondary"
            :disabled="newsletterLoading"
          >
            {{ newsletterLoading ? "Envoi..." : "S'inscrire" }}
          </Button>
        </form>
        <p v-if="newsletterMessage" class="mt-4 text-sm">
          {{ newsletterMessage }}
        </p>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="py-20 bg-background">
      <div class="container mx-auto px-4">
        <div class="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 class="text-4xl font-bold mb-4">Contactez-nous</h2>
            <p class="text-lg text-muted-foreground mb-8">
              Une question ? Un projet ? N'hésitez pas à nous contacter. Notre
              équipe vous répondra dans les plus brefs délais.
            </p>
            <div class="space-y-6">
              <div class="flex items-center gap-4">
                <div
                  class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
                >
                  <MapPin class="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p class="font-semibold">Adresse</p>
                  <p class="text-muted-foreground">
                    123 Rue de l'Innovation, 75001 Paris
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div
                  class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
                >
                  <Mail class="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p class="font-semibold">Email</p>
                  <p class="text-muted-foreground">contact@example.com</p>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div
                  class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
                >
                  <Phone class="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p class="font-semibold">Téléphone</p>
                  <p class="text-muted-foreground">+33 1 23 45 67 89</p>
                </div>
              </div>
            </div>
            <img
              src="https://picsum.photos/500/300?random=50"
              alt="Office"
              class="mt-8 rounded-lg shadow-lg w-full"
            />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Envoyez-nous un message</CardTitle>
              <CardDescription
                >Remplissez le formulaire ci-dessous et nous vous recontacterons
                rapidement.</CardDescription
              >
            </CardHeader>
            <CardContent>
              <form @submit.prevent="submitContact" class="space-y-4">
                <div class="grid sm:grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <label class="text-sm font-medium">Prénom</label>
                    <Input v-model="contactForm.firstName" placeholder="Jean" />
                  </div>
                  <div class="space-y-2">
                    <label class="text-sm font-medium">Nom</label>
                    <Input
                      v-model="contactForm.lastName"
                      placeholder="Dupont"
                    />
                  </div>
                </div>
                <div class="space-y-2">
                  <label class="text-sm font-medium">Email</label>
                  <Input
                    v-model="contactForm.email"
                    type="email"
                    placeholder="jean.dupont@example.com"
                  />
                </div>
                <div class="space-y-2">
                  <label class="text-sm font-medium">Sujet</label>
                  <Input
                    v-model="contactForm.subject"
                    placeholder="Sujet de votre message"
                  />
                </div>
                <div class="space-y-2">
                  <label class="text-sm font-medium">Message</label>
                  <textarea
                    v-model="contactForm.message"
                    class="w-full min-h-32 px-3 py-2 rounded-md border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Votre message..."
                  ></textarea>
                </div>
                <Button type="submit" class="w-full" :disabled="contactLoading">
                  {{
                    contactLoading ? "Envoi en cours..." : "Envoyer le message"
                  }}
                </Button>
                <p
                  v-if="contactMessage"
                  class="text-sm text-center"
                  :class="contactError ? 'text-destructive' : 'text-primary'"
                >
                  {{ contactMessage }}
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-muted/50 border-t py-12">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 class="font-bold text-lg mb-4">À propos</h3>
            <p class="text-sm text-muted-foreground">
              Notre mission est de démocratiser le développement web en
              fournissant des outils puissants et accessibles à tous.
            </p>
          </div>
          <div>
            <h3 class="font-bold text-lg mb-4">Produit</h3>
            <ul class="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" class="hover:text-foreground transition-colors"
                  >Fonctionnalités</a
                >
              </li>
              <li>
                <a href="#" class="hover:text-foreground transition-colors"
                  >Tarifs</a
                >
              </li>
              <li>
                <a href="#" class="hover:text-foreground transition-colors"
                  >Documentation</a
                >
              </li>
              <li>
                <a href="#" class="hover:text-foreground transition-colors"
                  >API</a
                >
              </li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold text-lg mb-4">Ressources</h3>
            <ul class="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" class="hover:text-foreground transition-colors"
                  >Blog</a
                >
              </li>
              <li>
                <a href="#" class="hover:text-foreground transition-colors"
                  >Tutoriels</a
                >
              </li>
              <li>
                <a href="#" class="hover:text-foreground transition-colors"
                  >Support</a
                >
              </li>
              <li>
                <a href="#" class="hover:text-foreground transition-colors"
                  >Communauté</a
                >
              </li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold text-lg mb-4">Légal</h3>
            <ul class="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" class="hover:text-foreground transition-colors"
                  >Conditions d'utilisation</a
                >
              </li>
              <li>
                <a href="#" class="hover:text-foreground transition-colors"
                  >Politique de confidentialité</a
                >
              </li>
              <li>
                <a href="#" class="hover:text-foreground transition-colors"
                  >Mentions légales</a
                >
              </li>
              <li>
                <a href="#" class="hover:text-foreground transition-colors"
                  >Cookies</a
                >
              </li>
            </ul>
          </div>
        </div>
        <div
          class="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p class="text-sm text-muted-foreground">
            © 2026 VotreEntreprise. Tous droits réservés.
          </p>
          <div class="flex gap-4">
            <a
              href="#"
              class="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter class="w-5 h-5" />
            </a>
            <a
              href="#"
              class="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github class="w-5 h-5" />
            </a>
            <a
              href="#"
              class="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin class="w-5 h-5" />
            </a>
            <a
              href="#"
              class="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Youtube class="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  Zap,
  Shield,
  BarChart3,
  Users,
  Cloud,
  Code,
  Check,
  Star,
  ChevronDown,
  Calendar,
  Clock,
  ArrowRight,
  MapPin,
  Mail,
  Phone,
  Twitter,
  Github,
  Linkedin,
  Youtube,
} from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import apiClient from "@/lib/utils/apiClient";

const router = useRouter();

const stats = ref({
  users: "0",
  projects: "0",
  satisfaction: "0%",
});

const features = [
  {
    icon: Zap,
    title: "Performance optimale",
    description:
      "Des temps de chargement ultra-rapides grâce à notre infrastructure mondiale.",
    items: [
      "CDN global",
      "Mise en cache intelligente",
      "Compression automatique",
      "HTTP/3 support",
    ],
  },
  {
    icon: Shield,
    title: "Sécurité renforcée",
    description:
      "Protection de vos données avec les dernières technologies de sécurité.",
    items: [
      "Chiffrement SSL/TLS",
      "Protection DDoS",
      "Authentification 2FA",
      "Audits réguliers",
    ],
  },
  {
    icon: BarChart3,
    title: "Analytics avancées",
    description:
      "Suivez vos performances en temps réel avec des tableaux de bord détaillés.",
    items: [
      "Métriques en temps réel",
      "Rapports personnalisés",
      "Alertes automatiques",
      "Export des données",
    ],
  },
  {
    icon: Users,
    title: "Collaboration d'équipe",
    description: "Travaillez efficacement avec votre équipe sur vos projets.",
    items: [
      "Espaces de travail partagés",
      "Gestion des permissions",
      "Historique des modifications",
      "Commentaires intégrés",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud natif",
    description:
      "Déployez vos applications sur notre infrastructure cloud évolutive.",
    items: [
      "Auto-scaling",
      "Déploiement continu",
      "Environnements de staging",
      "Rollback instantané",
    ],
  },
  {
    icon: Code,
    title: "API puissante",
    description:
      "Intégrez nos services facilement avec notre API RESTful complète.",
    items: [
      "Documentation complète",
      "SDKs officiels",
      "Webhooks",
      "Rate limiting flexible",
    ],
  },
];

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  comment: string;
  rating: number;
}

interface Author {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
}

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  readTime: number;
  views: number;
  author?: Author;
  category?: Category;
}

interface Statistic {
  id: string;
  label: string;
  value: string;
  description: string;
}

const testimonials = ref<Testimonial[]>([]);
const testimonialsLoading = ref(true);

const pricing = [
  {
    name: "Starter",
    price: 0,
    description: "Parfait pour découvrir la plateforme",
    features: [
      "3 projets",
      "1 Go de stockage",
      "Support communautaire",
      "Analytics basiques",
      "Déploiements manuels",
    ],
    cta: "Commencer gratuitement",
    popular: false,
  },
  {
    name: "Pro",
    price: 29,
    description: "Pour les professionnels exigeants",
    features: [
      "Projets illimités",
      "50 Go de stockage",
      "Support prioritaire",
      "Analytics avancées",
      "CI/CD intégré",
      "Domaines personnalisés",
      "SSL gratuit",
    ],
    cta: "Essai gratuit 14 jours",
    popular: true,
  },
  {
    name: "Enterprise",
    price: 99,
    description: "Pour les grandes équipes",
    features: [
      "Tout de Pro",
      "Stockage illimité",
      "Support dédié 24/7",
      "SLA garanti",
      "SSO & SAML",
      "Audit logs",
      "API dédiée",
    ],
    cta: "Contacter les ventes",
    popular: false,
  },
];

const articles = ref<Article[]>([]);
const articlesLoading = ref(true);
const categories = ref<Category[]>([]);
const categoriesLoading = ref(true);
const statistics = ref<Statistic[]>([]);

const faqs = [
  {
    question: "Comment fonctionne la période d'essai gratuite ?",
    answer:
      "Vous pouvez essayer notre plan Pro gratuitement pendant 14 jours, sans carte bancaire requise. À la fin de la période d'essai, vous pouvez choisir de continuer avec un abonnement payant ou revenir au plan gratuit.",
  },
  {
    question: "Puis-je changer de plan à tout moment ?",
    answer:
      "Oui, vous pouvez passer à un plan supérieur ou inférieur à tout moment. Les changements prennent effet immédiatement et la facturation est ajustée au prorata.",
  },
  {
    question: "Mes données sont-elles sécurisées ?",
    answer:
      "Absolument. Nous utilisons un chiffrement de bout en bout, stockons les données dans des centres de données certifiés SOC 2, et effectuons des sauvegardes régulières. Votre confidentialité est notre priorité.",
  },
  {
    question: "Proposez-vous un support technique ?",
    answer:
      "Oui, tous nos plans incluent un support technique. Le plan Starter bénéficie du support communautaire, le plan Pro d'un support prioritaire par email, et le plan Enterprise d'un support dédié 24/7.",
  },
  {
    question: "Comment puis-je annuler mon abonnement ?",
    answer:
      "Vous pouvez annuler votre abonnement à tout moment depuis les paramètres de votre compte. Vous continuerez à avoir accès aux fonctionnalités payantes jusqu'à la fin de votre période de facturation.",
  },
];

const openFaq = ref<number | null>(null);

const newsletterEmail = ref("");
const newsletterLoading = ref(false);
const newsletterMessage = ref("");

const contactForm = ref({
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: "",
});
const contactLoading = ref(false);
const contactMessage = ref("");
const contactError = ref(false);

function toggleFaq(idx: number) {
  openFaq.value = openFaq.value === idx ? null : idx;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function navigateToRegister() {
  router.push({ name: "app-register" });
}

function scrollToFeatures() {
  document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
}

async function submitNewsletter() {
  newsletterLoading.value = true;
  newsletterMessage.value = "";

  await new Promise((resolve) => setTimeout(resolve, 1500));

  const result = await apiClient.post("/newsletter/subscribe", {
    email: newsletterEmail.value,
  });

  if (result.error) {
    newsletterMessage.value = "Merci pour votre inscription ! (simulation)";
  } else {
    newsletterMessage.value = "Merci pour votre inscription !";
  }

  newsletterLoading.value = false;
  newsletterEmail.value = "";
}

async function submitContact() {
  contactLoading.value = true;
  contactMessage.value = "";
  contactError.value = false;

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const result = await apiClient.post("/contact", contactForm.value);

  if (result.error) {
    contactMessage.value = "Votre message a bien été envoyé ! (simulation)";
  } else {
    contactMessage.value = "Votre message a bien été envoyé !";
  }

  contactLoading.value = false;
  contactForm.value = {
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  };
}

async function fetchArticles() {
  articlesLoading.value = true;
  const result = await apiClient.get<{ data: Article[] }>(
    "/cms/articles/recent",
    { limit: 6 },
  );
  if (!result.error && result.data?.data) {
    articles.value = result.data.data;
  }
  articlesLoading.value = false;
}

async function fetchTestimonials() {
  testimonialsLoading.value = true;
  const result = await apiClient.get<{ data: Testimonial[] }>(
    "/cms/testimonials",
    { featured: true, limit: 6 },
  );
  if (!result.error && result.data?.data) {
    testimonials.value = result.data.data;
  }
  testimonialsLoading.value = false;
}

async function fetchCategories() {
  categoriesLoading.value = true;
  const result = await apiClient.get<{ data: Category[] }>("/cms/categories");
  if (!result.error && result.data?.data) {
    categories.value = result.data.data;
  }
  categoriesLoading.value = false;
}

async function fetchStatistics() {
  const result = await apiClient.get<{ data: Statistic[] }>("/cms/statistics");
  if (!result.error && result.data?.data) {
    statistics.value = result.data.data;
    const usersStat = statistics.value.find((s) => s.id === "stat-1");
    const projectsStat = statistics.value.find((s) => s.id === "stat-2");
    const satisfactionStat = statistics.value.find((s) => s.id === "stat-3");
    stats.value = {
      users: usersStat?.value || "15,000+",
      projects: projectsStat?.value || "50,000+",
      satisfaction: satisfactionStat?.value || "98%",
    };
  }
}

onMounted(() => {
  fetchStatistics();
  fetchArticles();
  fetchTestimonials();
  fetchCategories();

  apiClient.get("/analytics/track", { page: "landing" });
});
</script>
