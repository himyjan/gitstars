<template>
  <div
    class="relative flex-auto bg-white dark:bg-[#020617]"
    style="width: calc(100% - 24rem); color: var(--text-main)"
  >
    <header
      v-if="selectedRepository"
      class="flex h-9 items-center border-b border-solid border-b-gray-300 px-4 dark:border-b-slate-700 dark:bg-[#020617]"
    >
      <a
        :href="toRepositoryHref(selectedRepository)"
        class="inline-flex items-center hover:underline"
        rel="noopener noreferrer"
      >
        <h2 class="text-lg font-bold">
          <svg-icon name="github" class="text-xl" />
          {{ selectedRepository?.owner.login }} /
          {{ selectedRepository?.name }}
          <svg-icon name="share" class="text-sm" />
        </h2>
      </a>
    </header>

    <div
      v-show="!readme"
      class="relative top-1/3 mx-auto w-60 text-center text-gray-300"
    >
      <p class="mb-2 text-3xl font-bold">README.md</p>
      <p
        v-if="!selectedRepository"
        class="flex items-center justify-center text-sm text-gray-400 dark:text-gray-500"
      >
        <svg-icon name="hand-left" class="mr-1 text-base" />{{ t('readmeTip') }}
      </p>
      <svg-icon v-show="loading" name="loading" class="animate-spin text-2xl" />
    </div>

    <article
      v-show="readme"
      v-html="readme"
      ref="refReadme"
      class="markdown-body overflow-y-auto p-5 text-sm"
      style="height: calc(100% - 2.75rem)"
    />
  </div>
</template>

<script setup>
import { watchEffect, ref, nextTick } from 'vue';
import { storeToRefs } from 'pinia';
import { useRepositoryStore } from '@/store/repository';
import { useUserStore } from '@/store/user';
import { useI18n } from 'vue-i18n';
import SvgIcon from '@/components/svg-icon.vue';
import { getRepositoryReadme, getReadmeByMarkdown } from '@/server/github';
import { toRepostoryReadmeHref } from './tool';

const { t } = useI18n();

const userStore = useUserStore();
const { selectedRepository } = storeToRefs(useRepositoryStore());
const readme = ref('');
const refReadme = ref(null);
const loading = ref(false);

watchEffect(async () => {
  if (!selectedRepository.value) return;
  readme.value = '';
  loading.value = true;

  const { id } = selectedRepository.value;

  const { content, html_url } = await getRepositoryReadme({
    owner: selectedRepository.value.owner.login,
    name: selectedRepository.value.name,
  });
  const result = await getReadmeByMarkdown(
    decodeURIComponent(escape(atob(content))),
  );

  if (id !== selectedRepository.value.id) return;
  loading.value = false;

  const urlPrefix = html_url.slice(0, -9);

  readme.value = result
    .replace(/<[^>]+href="([^"]+)(?=")/g, (match, p1) => {
      const a = match.slice(0, match.lastIndexOf('"') + 1);
      const b = toRepostoryReadmeHref(p1, { urlPrefix });
      return a + b;
    })
    .replace(/<[^>]+src="([^"]+)(?=")/g, (match, p1) => {
      const a = match.slice(0, match.lastIndexOf('"') + 1);
      const b = toRepostoryReadmeHref(p1, { urlPrefix });
      return (a + b).replace('/blob/', '/raw/');
    });

  nextTick(() => {
    refReadme.value.scrollTo({ top: 0 });
  });
});

const toRepositoryHref = (repository) =>
  `https://github.com/${repository.owner.login}/${repository.name}`;
</script>

<style src="github-markdown-css/github-markdown.css"></style>

<style>
.markdown-body {
  font-size: 14px;
  background-color: var(--bg-card);
  color: var(--text-main);
}

.dark .markdown-body {
  background-color: var(--bg-card) !important;
  color: var(--text-main) !important;
}

.dark .markdown-body a {
  color: #58a6ff !important;
}

.dark .markdown-body code {
  background-color: #161b22 !important;
  color: #f0f6fc !important;
}

.dark .markdown-body pre {
  background-color: #0d1117 !important;
  color: #c9d1d9 !important;
}

.dark .markdown-body h1,
.dark .markdown-body h2,
.dark .markdown-body h3,
.dark .markdown-body h4,
.dark .markdown-body h5,
.dark .markdown-body h6 {
  color: #f0f6fc !important;
}

.dark .markdown-body blockquote {
  border-left-color: #30363d !important;
  color: #8b949e !important;
}

.dark .markdown-body hr {
  border-color: #30363d !important;
}

.markdown-body img {
  display: inline;
}
</style>
