<template>
  <div class="max-w-3xl mx-auto">
    <h1 class="text-3xl font-bold text-foreground mb-8">Articles</h1>

    <div v-if="loading" class="text-muted-foreground">Chargement...</div>

    <div v-else-if="articles.length === 0" class="text-muted-foreground">
      Aucun article publié pour le moment.
    </div>

    <div v-else class="space-y-8">
      <article
        v-for="article in articles"
        :key="article.id"
        class="border-b pb-8 last:border-0"
      >
        <router-link :to="`/article/${article.slug}`" class="group">
          <div
            v-if="article.coverImage"
            class="w-full h-48 overflow-hidden rounded-lg mb-4"
          >
            <img
              :src="article.coverImage"
              :alt="article.title"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div
            class="flex items-center gap-2 text-sm text-muted-foreground mb-2"
          >
            <span
              v-if="article.category"
              :style="{ color: article.category.color }"
            >
              {{ article.category.name }}
            </span>
            <span v-if="article.category">·</span>
            <span>{{ formatDate(article.publishedAt) }}</span>
            <span>·</span>
            <span>{{ article.readTime }} min de lecture</span>
          </div>

          <h2
            class="text-xl font-semibold text-foreground group-hover:text-primary mb-2"
          >
            {{ article.title }}
          </h2>

          <p class="text-muted-foreground mb-3">
            {{ article.excerpt }}
          </p>

          <div class="flex items-center gap-3">
            <span v-if="article.author" class="text-sm text-foreground">
              {{ article.author.firstName }} {{ article.author.lastName }}
            </span>
            <div v-if="article.tags?.length" class="flex items-center gap-1">
              <span
                v-for="tag in article.tags.slice(0, 3)"
                :key="tag"
                class="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </router-link>
      </article>

      <div
        v-if="pagination && pagination.totalPages > 1"
        class="flex items-center justify-center gap-2 pt-8"
      >
        <Button
          variant="outline"
          size="sm"
          :disabled="!pagination.hasPrevPage"
          @click="loadArticles(pagination.page - 1)"
        >
          Précédent
        </Button>
        <span class="text-sm text-muted-foreground">
          Page {{ pagination.page }} / {{ pagination.totalPages }}
        </span>
        <Button
          variant="outline"
          size="sm"
          :disabled="!pagination.hasNextPage"
          @click="loadArticles(pagination.page + 1)"
        >
          Suivant
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Button } from "@/components/ui/button";
import apiClient from "@/lib/utils/apiClient";
import type { Article, PaginatedResponse } from "@/lib/utils/types";

const articles = ref<Article[]>([]);
const loading = ref(true);
const pagination = ref<PaginatedResponse<Article>["pagination"] | null>(null);

async function loadArticles(page = 1) {
  loading.value = true;
  const result = await apiClient.get<PaginatedResponse<Article>>("/articles", {
    page,
    limit: 10,
  });
  if (result.data) {
    articles.value = result.data.data;
    pagination.value = result.data.pagination;
  }
  loading.value = false;
}

function formatDate(date: Date | string | null) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

onMounted(() => {
  loadArticles();
});
</script>
