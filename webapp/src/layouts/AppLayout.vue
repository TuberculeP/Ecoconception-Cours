<template>
  <div class="min-h-screen bg-background">
    <header class="border-b p-4 flex items-center justify-between">
      <div class="flex items-center gap-6">
        <router-link to="/" class="font-semibold text-foreground">
          Accueil
        </router-link>
        <router-link
          to="/feed"
          class="text-muted-foreground hover:text-foreground"
        >
          Articles
        </router-link>
        <router-link
          v-if="isAuthenticated"
          to="/admin/articles"
          class="text-muted-foreground hover:text-foreground"
        >
          Admin
        </router-link>
      </div>
      <div class="flex items-center gap-4">
        <template v-if="isAuthenticated">
          <span class="text-foreground text-sm">{{ user?.firstName }}</span>
          <Button variant="outline" size="sm" @click="disconnect"
            >Déconnexion</Button
          >
        </template>
        <template v-else>
          <router-link to="/login">
            <Button variant="outline" size="sm">Connexion</Button>
          </router-link>
        </template>
      </div>
    </header>
    <main class="p-4">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/authStore";
import apiClient from "../lib/utils/apiClient";
import { Button } from "@/components/ui/button";

const { user, isAuthenticated } = storeToRefs(useAuthStore());

async function disconnect() {
  const result = await apiClient.post("/auth/logout");
  if (result.data) {
    user.value = undefined;
    window.location.reload();
  }
}
</script>
