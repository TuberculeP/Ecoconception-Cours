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
              {{ t("hero.title") }}
              <span class="text-primary">{{ t("hero.title_highlight") }}</span>
            </h1>
            <p class="text-xl text-muted-foreground max-w-xl">
              {{ t("hero.description") }}
            </p>
            <div class="flex flex-wrap gap-4">
              <Button size="lg" @click="navigateToRegister">
                {{ t("hero.cta_primary") }}
              </Button>
              <Button size="lg" variant="outline" @click="scrollToFeatures">
                {{ t("hero.cta_secondary") }}
              </Button>
            </div>
            <div class="flex items-center gap-8 pt-4">
              <div class="text-center">
                <p class="text-3xl font-bold text-primary">{{ stats.users }}</p>
                <p class="text-sm text-muted-foreground">
                  {{ t("hero.stats.users") }}
                </p>
              </div>
              <div class="text-center">
                <p class="text-3xl font-bold text-primary">
                  {{ stats.projects }}
                </p>
                <p class="text-sm text-muted-foreground">
                  {{ t("hero.stats.projects") }}
                </p>
              </div>
              <div class="text-center">
                <p class="text-3xl font-bold text-primary">
                  {{ stats.satisfaction }}
                </p>
                <p class="text-sm text-muted-foreground">
                  {{ t("hero.stats.satisfaction") }}
                </p>
              </div>
            </div>
          </div>
          <div class="relative">
            <img
              src="https://picsum.photos/seed/hero-main/600/400"
              alt="Main dashboard preview with charts and stats"
              class="rounded-xl shadow-2xl w-full"
              fetchpriority="high"
              width="600"
              height="400"
            />
            <img
              src="https://picsum.photos/seed/hero-feature/300/200"
              alt="Highlighted feature preview with analytics graph"
              class="absolute -bottom-8 -left-8 rounded-lg shadow-xl hidden lg:block"
              fetchpriority="high"
              width="300"
              height="200"
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
          {{ t("logos.trust") }}
        </p>
        <div class="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
          <img
            v-for="i in 6"
            :key="i"
            :src="`https://picsum.photos/seed/logo-${i}/120/40?grayscale`"
            :alt="`Logo of trusted partner number ${i}`"
            class="h-8 opacity-60 hover:opacity-100 transition-opacity"
            fetchpriority="high"
          />
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 bg-background">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <h2 class="text-4xl font-bold mb-4">{{ t("features.title") }}</h2>
          <p class="text-lg text-muted-foreground">
            {{ t("features.description") }}
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
          <h2 class="text-4xl font-bold mb-4">{{ t("gallery.title") }}</h2>
          <p class="text-lg text-muted-foreground">
            {{ t("gallery.description") }}
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div
            v-for="i in 12"
            :key="i"
            class="relative group overflow-hidden rounded-lg aspect-square"
          >
            <img
              :src="`https://picsum.photos/seed/gallery-${i}/400/400`"
              :alt="`Screenshot of project number ${i}`"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              fetchpriority="high"
              width="400"
              height="400"
            />
            <div
              class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            >
              <Button variant="secondary" size="sm">{{
                t("gallery.view_project")
              }}</Button>
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
            {{ t("testimonials.title") }}
          </h2>
          <p class="text-lg text-muted-foreground">
            {{ t("testimonials.description") }}
          </p>
        </div>

        <div
          v-if="testimonialsLoading"
          class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <div
            v-for="i in 6"
            :key="i"
            class="bg-muted/20 animate-pulse flex flex-col gap-6 rounded-xl border py-6 shadow-sm"
          >
            <div class="px-6">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 rounded-full bg-muted"></div>
                <div class="space-y-2">
                  <div class="h-4 bg-muted rounded w-24"></div>
                  <div class="h-3 bg-muted rounded w-32"></div>
                </div>
              </div>
              <div class="h-16 bg-muted rounded"></div>
            </div>
          </div>
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
                  fetchpriority="high"
                  width="48"
                  height="48"
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
          <h2 class="text-4xl font-bold mb-4">{{ t("pricing.title") }}</h2>
          <p class="text-lg text-muted-foreground">
            {{ t("pricing.description") }}
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
                {{ t("pricing.popular") }}
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
          <h2 class="text-4xl font-bold mb-4">{{ t("blog.title") }}</h2>
          <p class="text-lg text-muted-foreground">
            {{ t("blog.description") }}
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
            class="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            @click="router.push(`/article/${article.slug}`)"
          >
            <div v-if="article.coverImage" class="w-full h-48 overflow-hidden">
              <img
                :src="article.coverImage"
                :alt="article.title"
                class="w-full h-full object-cover"
                fetchpriority="high"
              />
            </div>
            <div
              v-else
              class="w-full h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center"
            >
              <FileText class="w-12 h-12 text-muted-foreground" />
            </div>
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
                <div
                  class="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center"
                >
                  <span class="text-xs font-medium text-primary">
                    {{ article.author.firstName?.charAt(0)
                    }}{{ article.author.lastName?.charAt(0) }}
                  </span>
                </div>
                {{ article.author.firstName }} {{ article.author.lastName }}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" class="w-full">
                {{ t("blog.read_more") }}
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
          <h2 class="text-4xl font-bold mb-4">{{ t("faq.title") }}</h2>
          <p class="text-lg text-muted-foreground">
            {{ t("faq.description") }}
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
        <h2 class="text-4xl font-bold mb-4">{{ t("newsletter.title") }}</h2>
        <p class="text-lg opacity-90 max-w-xl mx-auto mb-8">
          {{ t("newsletter.description") }}
        </p>
        <form
          @submit.prevent="submitNewsletter"
          class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
        >
          <Input
            v-model="newsletterEmail"
            type="email"
            :placeholder="t('newsletter.placeholder')"
            class="flex-1 newsletter-input"
          />
          <Button
            type="submit"
            variant="secondary"
            :disabled="newsletterLoading"
          >
            {{
              newsletterLoading
                ? t("newsletter.cta_loading")
                : t("newsletter.cta")
            }}
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
            <h2 class="text-4xl font-bold mb-4">{{ t("contact.title") }}</h2>
            <p class="text-lg text-muted-foreground mb-8">
              {{ t("contact.description") }}
            </p>
            <div class="space-y-6">
              <div class="flex items-center gap-4">
                <div
                  class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
                >
                  <MapPin class="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p class="font-semibold">{{ t("contact.address") }}</p>
                  <p class="text-muted-foreground">
                    {{ t("contact.address_value") }}
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
                  <p class="font-semibold">{{ t("contact.email") }}</p>
                  <p class="text-muted-foreground">
                    {{ t("contact.email_value") }}
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div
                  class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
                >
                  <Phone class="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p class="font-semibold">{{ t("contact.phone") }}</p>
                  <p class="text-muted-foreground">
                    {{ t("contact.phone_value") }}
                  </p>
                </div>
              </div>
            </div>
            <img
              src="https://picsum.photos/seed/office/500/300"
              alt="Office"
              class="mt-8 rounded-lg shadow-lg w-full"
              width="500"
              height="300"
            />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>{{ t("contact.form.title") }}</CardTitle>
              <CardDescription>{{
                t("contact.form.description")
              }}</CardDescription>
            </CardHeader>
            <CardContent>
              <form @submit.prevent="submitContact" class="space-y-4">
                <div class="grid sm:grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <label class="text-sm font-medium">{{
                      t("contact.form.firstName")
                    }}</label>
                    <Input
                      v-model="contactForm.firstName"
                      :placeholder="t('contact.form.firstName_placeholder')"
                    />
                  </div>
                  <div class="space-y-2">
                    <label class="text-sm font-medium">{{
                      t("contact.form.lastName")
                    }}</label>
                    <Input
                      v-model="contactForm.lastName"
                      :placeholder="t('contact.form.lastName_placeholder')"
                    />
                  </div>
                </div>
                <div class="space-y-2">
                  <label class="text-sm font-medium">{{
                    t("contact.form.email")
                  }}</label>
                  <Input
                    v-model="contactForm.email"
                    type="email"
                    :placeholder="t('contact.form.email_placeholder')"
                  />
                </div>
                <div class="space-y-2">
                  <label class="text-sm font-medium">{{
                    t("contact.form.subject")
                  }}</label>
                  <Input
                    v-model="contactForm.subject"
                    :placeholder="t('contact.form.subject_placeholder')"
                  />
                </div>
                <div class="space-y-2">
                  <label class="text-sm font-medium">{{
                    t("contact.form.message")
                  }}</label>
                  <textarea
                    v-model="contactForm.message"
                    class="w-full min-h-32 px-3 py-2 rounded-md border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    :placeholder="t('contact.form.message_placeholder')"
                  ></textarea>
                </div>
                <Button type="submit" class="w-full" :disabled="contactLoading">
                  {{
                    contactLoading
                      ? t("contact.form.submit_loading")
                      : t("contact.form.submit")
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
            <h3 class="font-bold text-lg mb-4">
              {{ t("footer.about.title") }}
            </h3>
            <p class="text-sm text-muted-foreground">
              {{ t("footer.about.description") }}
            </p>
          </div>
          <div>
            <h3 class="font-bold text-lg mb-4">
              {{ t("footer.product.title") }}
            </h3>
            <ul class="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="#"
                  class="hover:text-foreground transition-colors"
                  aria-label="Product features"
                  >{{ t("footer.product.features") }}</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="hover:text-foreground transition-colors"
                  aria-label="Product pricing"
                  >{{ t("footer.product.pricing") }}</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="hover:text-foreground transition-colors"
                  aria-label="Product documentation"
                  >{{ t("footer.product.documentation") }}</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="hover:text-foreground transition-colors"
                  aria-label="Product API"
                  >{{ t("footer.product.api") }}</a
                >
              </li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold text-lg mb-4">
              {{ t("footer.resources.title") }}
            </h3>
            <ul class="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="#"
                  class="hover:text-foreground transition-colors"
                  aria-label="Blog resource"
                  >{{ t("footer.resources.blog") }}</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="hover:text-foreground transition-colors"
                  aria-label="Tutorials resource"
                  >{{ t("footer.resources.tutorials") }}</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="hover:text-foreground transition-colors"
                  aria-label="Support resource"
                  >{{ t("footer.resources.support") }}</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="hover:text-foreground transition-colors"
                  aria-label="Community resource"
                  >{{ t("footer.resources.community") }}</a
                >
              </li>
            </ul>
          </div>
          <div>
            <h3 class="font-bold text-lg mb-4">
              {{ t("footer.legal.title") }}
            </h3>
            <ul class="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="#"
                  class="hover:text-foreground transition-colors"
                  aria-label="Terms and conditions"
                  >{{ t("footer.legal.terms") }}</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="hover:text-foreground transition-colors"
                  aria-label="Privacy policy"
                  >{{ t("footer.legal.privacy") }}</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="hover:text-foreground transition-colors"
                  aria-label="Legal mentions"
                  >{{ t("footer.legal.mentions") }}</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="hover:text-foreground transition-colors"
                  aria-label="Cookie policy"
                  >{{ t("footer.legal.cookies") }}</a
                >
              </li>
            </ul>
          </div>
        </div>
        <div
          class="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p class="text-sm text-muted-foreground">
            {{ t("footer.copyright") }}
          </p>
          <div class="flex gap-4">
            <a
              href="#"
              aria-label="Twitter"
              class="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter class="w-5 h-5" />
            </a>
            <a
              href="#"
              aria-label="Github"
              class="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github class="w-5 h-5" />
            </a>
            <a
              href="#"
              aria-label="Linkedin"
              class="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin class="w-5 h-5" />
            </a>
            <a
              href="#"
              aria-label="Youtube"
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

<style scoped>
.newsletter-input {
  background-color: #fff !important;
  color: #222 !important;
  border: 1px solid #ccc;
}
</style>

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
  FileText,
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
import type { Article, Category } from "@/lib/utils/types";

import { useI18n } from "vue-i18n";

const { t } = useI18n();

const router = useRouter();

const stats = ref({
  users: "0",
  projects: "0",
  satisfaction: "0%",
});

const features = [
  {
    icon: Zap,
    title: t("features.performance.title"),
    description: t("features.performance.description"),
    items: [
      t("features.performance.item1"),
      t("features.performance.item2"),
      t("features.performance.item3"),
      t("features.performance.item4"),
    ],
  },
  {
    icon: Shield,
    title: t("features.security.title"),
    description: t("features.security.description"),
    items: [
      t("features.security.item1"),
      t("features.security.item2"),
      t("features.security.item3"),
      t("features.security.item4"),
    ],
  },
  {
    icon: BarChart3,
    title: t("features.analytics.title"),
    description: t("features.analytics.description"),
    items: [
      t("features.analytics.item1"),
      t("features.analytics.item2"),
      t("features.analytics.item3"),
      t("features.analytics.item4"),
    ],
  },
  {
    icon: Users,
    title: t("features.collaboration.title"),
    description: t("features.collaboration.description"),
    items: [
      t("features.collaboration.item1"),
      t("features.collaboration.item2"),
      t("features.collaboration.item3"),
      t("features.collaboration.item4"),
    ],
  },
  {
    icon: Cloud,
    title: t("features.cloud.title"),
    description: t("features.cloud.description"),
    items: [
      t("features.cloud.item1"),
      t("features.cloud.item2"),
      t("features.cloud.item3"),
      t("features.cloud.item4"),
    ],
  },
  {
    icon: Code,
    title: t("features.api.title"),
    description: t("features.api.description"),
    items: [
      t("features.api.item1"),
      t("features.api.item2"),
      t("features.api.item3"),
      t("features.api.item4"),
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

function formatDate(dateString: string | Date | null): string {
  if (!dateString) return "";
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
  const result = await apiClient.get<{ data: Article[]; pagination: unknown }>(
    "/articles",
    { limit: 3 },
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
