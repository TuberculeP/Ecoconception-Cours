<template>
  <select
    v-model="selected"
    class="w-36 h-9 px-3 py-1 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
  >
    <option value="en">English</option>
    <option value="fr">Français</option>
  </select>
</template>

<script setup lang="ts">
import { ref, watch, watchEffect } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const selected = ref<string>(locale.value);

watch(selected, (newLang) => {
  if (newLang) {
    locale.value = newLang;
    localStorage.setItem("lang", newLang);
  }
});

watchEffect(() => {
  const storedLang = localStorage.getItem("lang");
  if (storedLang) {
    selected.value = storedLang;
    locale.value = storedLang;
  }
});
</script>
