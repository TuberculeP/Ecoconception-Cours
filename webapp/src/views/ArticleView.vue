<template>
  <div class="max-w-3xl mx-auto">
    <div v-if="loading" class="text-muted-foreground">Chargement...</div>

    <div v-else-if="!article" class="text-muted-foreground">
      Article non trouvé.
    </div>

    <article v-else>
      <router-link
        to="/feed"
        class="text-muted-foreground hover:text-foreground text-sm"
      >
        ← Retour aux articles
      </router-link>

      <header class="mt-6 mb-8">
        <div class="flex items-center gap-2 text-sm text-muted-foreground mb-3">
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
          <span>·</span>
          <span>{{ article.views }} vues</span>
        </div>

        <h1 class="text-3xl font-bold text-foreground mb-4">
          {{ article.title }}
        </h1>

        <p class="text-lg text-muted-foreground mb-4">
          {{ article.excerpt }}
        </p>

        <div v-if="article.author" class="flex items-center gap-3">
          <div>
            <p class="font-medium text-foreground">
              {{ article.author.firstName }} {{ article.author.lastName }}
            </p>
          </div>
        </div>

        <div v-if="article.tags?.length" class="flex items-center gap-2 mt-4">
          <span
            v-for="tag in article.tags"
            :key="tag"
            class="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground"
          >
            {{ tag }}
          </span>
        </div>
      </header>

      <div
        class="prose prose-lg dark:prose-invert max-w-none"
        v-html="renderedContent"
      />
    </article>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import apiClient from "@/lib/utils/apiClient";
import type { Article } from "@/lib/utils/types";

const route = useRoute();
const article = ref<Article | null>(null);
const loading = ref(true);

async function loadArticle() {
  loading.value = true;
  const result = await apiClient.get<{ data: Article }>(
    `/articles/${route.params.slug}`,
  );
  if (result.data) {
    article.value = result.data.data;
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

const renderedContent = computed(() => {
  if (!article.value) return "";
  return renderMarkdown(article.value.content);
});

function renderMarkdown(text: string): string {
  if (!text) return "";

  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  html = html.replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>");
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  html = html.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img src="$2" alt="$1" class="max-w-full h-auto rounded my-4" />',
  );
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  html = html.replace(/^- (.+)$/gm, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>");
  html = html.replace(/\n\n/g, "</p><p>");
  html = "<p>" + html + "</p>";
  html = html.replace(/<p><\/p>/g, "");
  html = html.replace(/<p>(<h[1-3]>)/g, "$1");
  html = html.replace(/(<\/h[1-3]>)<\/p>/g, "$1");
  html = html.replace(/<p>(<pre>)/g, "$1");
  html = html.replace(/(<\/pre>)<\/p>/g, "$1");
  html = html.replace(/<p>(<ul>)/g, "$1");
  html = html.replace(/(<\/ul>)<\/p>/g, "$1");

  return html;
}

onMounted(() => {
  loadArticle();
});
</script>
