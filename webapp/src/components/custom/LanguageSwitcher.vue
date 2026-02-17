<template>
  <Select v-model="selected" class="w-36">
    <SelectTrigger>
      <SelectValue placeholder="Langue" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="en">
        <SelectItemText>English</SelectItemText>
      </SelectItem>
      <SelectItem value="fr">
        <SelectItemText>Français</SelectItemText>
      </SelectItem>
    </SelectContent>
  </Select>
</template>

<script setup lang="ts">
import { ref, watch, watchEffect } from "vue";
import { useI18n } from "vue-i18n";

// shadcn select components
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectItemText,
} from "@/components/ui/select";

const { locale } = useI18n();

// v-model bound value
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
