<template>
  <div class="max-w-4xl mx-auto">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-4">
        <router-link
          to="/admin/articles"
          class="text-muted-foreground hover:text-foreground"
        >
          ← Retour
        </router-link>
        <h1 class="text-2xl font-bold text-foreground">
          {{ isEditing ? "Modifier l'article" : "Nouvel article" }}
        </h1>
      </div>
      <div class="flex items-center gap-2">
        <Button variant="outline" @click="save('draft')" :disabled="saving">
          Enregistrer brouillon
        </Button>
        <Button @click="save('published')" :disabled="saving">
          {{ saving ? "Enregistrement..." : "Publier" }}
        </Button>
      </div>
    </div>

    <div v-if="loading" class="text-muted-foreground">Chargement...</div>

    <form v-else class="space-y-6" @submit.prevent="save(form.status)">
      <div>
        <label class="block text-sm font-medium mb-2 text-foreground"
          >Titre</label
        >
        <Input
          v-model="form.title"
          placeholder="Titre de l'article"
          class="w-full"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-2 text-foreground"
          >Extrait</label
        >
        <textarea
          v-model="form.excerpt"
          placeholder="Résumé de l'article (optionnel)"
          rows="2"
          class="w-full border rounded-md px-3 py-2 text-sm bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-2 text-foreground"
            >Catégorie</label
          >
          <select
            v-model="form.categoryId"
            class="w-full border rounded-md px-3 py-2 text-sm bg-transparent text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Sans catégorie</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2 text-foreground"
            >Tags</label
          >
          <Input
            v-model="tagsInput"
            placeholder="tag1, tag2, tag3"
            class="w-full"
          />
          <p class="text-xs text-muted-foreground mt-1">
            Séparés par des virgules
          </p>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <label class="flex items-center gap-2 text-sm text-foreground">
          <input
            v-model="form.featured"
            type="checkbox"
            class="rounded border-input"
          />
          Article mis en avant
        </label>
      </div>

      <div>
        <label class="block text-sm font-medium mb-2 text-foreground"
          >Contenu</label
        >
        <MarkdownEditor v-model="form.content" min-height="500px" />
      </div>

      <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MarkdownEditor from "@/components/editor/MarkdownEditor.vue";
import apiClient from "@/lib/utils/apiClient";
import type { Article, Category, ArticleStatus } from "@/lib/utils/types";

const route = useRoute();
const router = useRouter();

const isEditing = computed(() => !!route.params.id);
const loading = ref(false);
const saving = ref(false);
const error = ref("");
const categories = ref<Category[]>([]);
const tagsInput = ref("");

const form = reactive({
  title: "",
  excerpt: "",
  content: "",
  categoryId: "",
  tags: [] as string[],
  status: "draft" as ArticleStatus,
  featured: false,
});

watch(tagsInput, (value) => {
  form.tags = value
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
});

async function loadCategories() {
  const result = await apiClient.get<{ data: Category[] }>(
    "/articles/categories",
  );
  if (result.data) {
    categories.value = result.data.data;
  }
}

async function loadArticle() {
  if (!route.params.id) return;

  loading.value = true;
  const result = await apiClient.get<{ data: Article }>(
    `/articles/${route.params.id}`,
  );
  if (result.data) {
    const article = result.data.data;
    form.title = article.title;
    form.excerpt = article.excerpt || "";
    form.content = article.content;
    form.categoryId = article.categoryId || "";
    form.tags = article.tags || [];
    form.status = article.status;
    form.featured = article.featured;
    tagsInput.value = form.tags.join(", ");
  }
  loading.value = false;
}

async function save(status: ArticleStatus) {
  if (!form.title.trim()) {
    error.value = "Le titre est requis";
    return;
  }
  if (!form.content.trim()) {
    error.value = "Le contenu est requis";
    return;
  }

  saving.value = true;
  error.value = "";

  const payload = {
    title: form.title,
    content: form.content,
    excerpt: form.excerpt || undefined,
    categoryId: form.categoryId || undefined,
    tags: form.tags,
    status,
    featured: form.featured,
  };

  let result;
  if (isEditing.value) {
    result = await apiClient.put<{ data: Article }>(
      `/articles/${route.params.id}`,
      payload,
    );
  } else {
    result = await apiClient.post<{ data: Article }>("/articles", payload);
  }

  saving.value = false;

  if (result.error) {
    error.value = result.error;
    return;
  }

  router.push("/admin/articles");
}

onMounted(() => {
  loadCategories();
  if (isEditing.value) {
    loadArticle();
  }
});
</script>
