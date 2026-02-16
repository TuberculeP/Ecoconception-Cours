<template>
  <div class="max-w-6xl mx-auto">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-foreground">Articles</h1>
      <router-link to="/admin/articles/new">
        <Button>Nouvel article</Button>
      </router-link>
    </div>

    <div v-if="loading" class="text-muted-foreground">Chargement...</div>

    <div v-else-if="articles.length === 0" class="text-muted-foreground">
      Aucun article pour le moment.
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="article in articles"
        :key="article.id"
        class="border rounded-lg p-4 bg-card"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <router-link
                :to="`/admin/articles/${article.id}/edit`"
                class="font-medium text-foreground hover:underline truncate"
              >
                {{ article.title }}
              </router-link>
              <span
                :class="[
                  'text-xs px-2 py-0.5 rounded-full',
                  article.status === 'published'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800',
                ]"
              >
                {{ article.status === "published" ? "Publié" : "Brouillon" }}
              </span>
              <span
                v-if="article.featured"
                class="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800"
              >
                Featured
              </span>
            </div>
            <p class="text-sm text-muted-foreground line-clamp-2">
              {{ article.excerpt }}
            </p>
            <div
              class="flex items-center gap-4 mt-2 text-xs text-muted-foreground"
            >
              <span v-if="article.author">
                {{ article.author.firstName }} {{ article.author.lastName }}
              </span>
              <span
                v-if="article.category"
                :style="{ color: article.category.color }"
              >
                {{ article.category.name }}
              </span>
              <span>{{ article.readTime }} min de lecture</span>
              <span>{{ article.views }} vues</span>
              <span>{{ formatDate(article.createdAt) }}</span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <router-link :to="`/admin/articles/${article.id}/edit`">
              <Button variant="outline" size="sm">Modifier</Button>
            </router-link>
            <Button
              variant="destructive"
              size="sm"
              @click="confirmDelete(article)"
            >
              Supprimer
            </Button>
          </div>
        </div>
      </div>

      <div
        v-if="pagination && pagination.totalPages > 1"
        class="flex items-center justify-center gap-2 mt-6"
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

    <div
      v-if="deleteModal.open"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click.self="deleteModal.open = false"
    >
      <div class="bg-background border rounded-lg p-6 max-w-md w-full mx-4">
        <h2 class="text-lg font-semibold mb-2">Confirmer la suppression</h2>
        <p class="text-muted-foreground mb-4">
          Êtes-vous sûr de vouloir supprimer l'article "{{
            deleteModal.article?.title
          }}" ? Cette action est irréversible.
        </p>
        <div class="flex justify-end gap-2">
          <Button variant="outline" @click="deleteModal.open = false">
            Annuler
          </Button>
          <Button variant="destructive" @click="deleteArticle">
            Supprimer
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { Button } from "@/components/ui/button";
import apiClient from "@/lib/utils/apiClient";
import type { Article, PaginatedResponse } from "@/lib/utils/types";

const articles = ref<Article[]>([]);
const loading = ref(true);
const pagination = ref<PaginatedResponse<Article>["pagination"] | null>(null);

const deleteModal = reactive({
  open: false,
  article: null as Article | null,
});

async function loadArticles(page = 1) {
  loading.value = true;
  const result = await apiClient.get<PaginatedResponse<Article>>(
    "/articles/admin",
    { page, limit: 20 },
  );
  if (result.data) {
    articles.value = result.data.data;
    pagination.value = result.data.pagination;
  }
  loading.value = false;
}

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function confirmDelete(article: Article) {
  deleteModal.article = article;
  deleteModal.open = true;
}

async function deleteArticle() {
  if (!deleteModal.article) return;

  const result = await apiClient.delete(`/articles/${deleteModal.article.id}`);
  if (!result.error) {
    articles.value = articles.value.filter(
      (a) => a.id !== deleteModal.article!.id,
    );
    deleteModal.open = false;
    deleteModal.article = null;
  }
}

onMounted(() => {
  loadArticles();
});
</script>
