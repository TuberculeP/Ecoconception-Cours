<template>
  <div class="border rounded-lg overflow-hidden">
    <div class="border-b bg-muted/30 px-2 py-1 flex items-center gap-1">
      <button
        type="button"
        class="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
        title="Gras (Ctrl+B)"
        @click="insertFormat('**', '**')"
      >
        <span class="font-bold text-sm">B</span>
      </button>
      <button
        type="button"
        class="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
        title="Italique (Ctrl+I)"
        @click="insertFormat('*', '*')"
      >
        <span class="italic text-sm">I</span>
      </button>
      <button
        type="button"
        class="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
        title="Titre H2"
        @click="insertAtLineStart('## ')"
      >
        <span class="text-sm font-semibold">H2</span>
      </button>
      <button
        type="button"
        class="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
        title="Titre H3"
        @click="insertAtLineStart('### ')"
      >
        <span class="text-sm font-semibold">H3</span>
      </button>
      <button
        type="button"
        class="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
        title="Liste"
        @click="insertAtLineStart('- ')"
      >
        <span class="text-sm">•</span>
      </button>
      <button
        type="button"
        class="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
        title="Lien"
        @click="insertFormat('[', '](url)')"
      >
        <span class="text-sm">🔗</span>
      </button>
      <button
        type="button"
        class="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
        title="Image"
        :disabled="uploading"
        @click="fileInputRef?.click()"
      >
        <span class="text-sm">🖼️</span>
      </button>
      <input
        ref="fileInputRef"
        type="file"
        accept="image/*"
        class="hidden"
        @change="handleImageUpload"
      />
      <span v-if="uploading" class="text-xs text-muted-foreground px-1">
        Upload...
      </span>
      <button
        type="button"
        class="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
        title="Code"
        @click="insertFormat('`', '`')"
      >
        <span class="text-sm font-mono">&lt;/&gt;</span>
      </button>
      <button
        type="button"
        class="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
        title="Bloc de code"
        @click="insertFormat('\n```\n', '\n```\n')"
      >
        <span class="text-sm font-mono">{ }</span>
      </button>
      <div class="flex-1" />
      <button
        type="button"
        class="p-1.5 rounded hover:bg-muted text-xs text-muted-foreground"
        :class="{ 'bg-muted text-foreground': showPreview }"
        @click="showPreview = !showPreview"
      >
        {{ showPreview ? "Éditer" : "Aperçu" }}
      </button>
    </div>

    <div class="relative" :style="{ minHeight: minHeight }">
      <textarea
        v-show="!showPreview"
        ref="textareaRef"
        :value="modelValue"
        :placeholder="placeholder"
        class="w-full h-full p-4 resize-none bg-transparent text-foreground focus:outline-none font-mono text-sm"
        :style="{ minHeight: minHeight }"
        @input="onInput"
        @keydown="onKeydown"
      />
      <div
        v-show="showPreview"
        class="p-4 prose prose-sm dark:prose-invert max-w-none overflow-auto"
        :style="{ minHeight: minHeight }"
        v-html="renderedContent"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import apiClient from "@/lib/utils/apiClient";

const props = withDefaults(
  defineProps<{
    modelValue: string;
    placeholder?: string;
    minHeight?: string;
  }>(),
  {
    placeholder: "Écrivez votre contenu en Markdown...",
    minHeight: "400px",
  },
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const textareaRef = ref<HTMLTextAreaElement | null>(null);
const fileInputRef = ref<HTMLInputElement | null>(null);
const showPreview = ref(false);
const uploading = ref(false);

function onInput(event: Event) {
  const target = event.target as HTMLTextAreaElement;
  emit("update:modelValue", target.value);
}

function insertFormat(before: string, after: string) {
  const textarea = textareaRef.value;
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const text = props.modelValue;
  const selectedText = text.substring(start, end);

  const newText =
    text.substring(0, start) +
    before +
    selectedText +
    after +
    text.substring(end);

  emit("update:modelValue", newText);

  requestAnimationFrame(() => {
    textarea.focus();
    const newCursorPos = start + before.length + selectedText.length;
    textarea.setSelectionRange(newCursorPos, newCursorPos);
  });
}

function insertAtLineStart(prefix: string) {
  const textarea = textareaRef.value;
  if (!textarea) return;

  const start = textarea.selectionStart;
  const text = props.modelValue;

  const lineStart = text.lastIndexOf("\n", start - 1) + 1;

  const newText =
    text.substring(0, lineStart) + prefix + text.substring(lineStart);

  emit("update:modelValue", newText);

  requestAnimationFrame(() => {
    textarea.focus();
    textarea.setSelectionRange(start + prefix.length, start + prefix.length);
  });
}

async function handleImageUpload(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  uploading.value = true;

  const formData = new FormData();
  formData.append("file", file);

  const result = await apiClient.post<{ url: string }>(
    "/shared/uploads",
    formData,
  );

  uploading.value = false;
  target.value = "";

  if (result.data) {
    const alt = file.name.replace(/\.[^/.]+$/, "");
    insertFormat(`![${alt}](`, `${result.data.url})`);
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.ctrlKey || event.metaKey) {
    if (event.key === "b") {
      event.preventDefault();
      insertFormat("**", "**");
    } else if (event.key === "i") {
      event.preventDefault();
      insertFormat("*", "*");
    }
  }
}

const renderedContent = computed(() => {
  return renderMarkdown(props.modelValue);
});

function renderMarkdown(text: string): string {
  if (!text) return "<p class='text-muted-foreground'>Aucun contenu</p>";

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
    '<img src="$2" alt="$1" class="max-w-full h-auto rounded" />',
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
  html = html.replace(/<p>(<img)/g, "$1");
  html = html.replace(/(\/?>)<\/p>/g, "$1");

  return html;
}
</script>
