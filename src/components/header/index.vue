<template>
  <header
    class="flex h-16 flex-none items-center justify-between gap-2 border-b border-solid border-b-gray-300 bg-white px-4 dark:bg-slate-900 dark:border-b-slate-700"
  >
    <div class="flex items-center">
      <a :href="userinfo.html_url" rel="noopener noreferrer">
        <img :src="userinfo.avatar_url" alt="" class="w-10 rounded-full" />
      </a>

      <a
        :href="`${userinfo.html_url}?tab=repositories`"
        rel="noopener noreferrer"
        class="ml-3 text-xl font-bold text-[#948aec] hover:underline"
      >
        <h2>
          {{ $t('userTitle', { username: userinfo.name }) }}
          <svg-icon name="share" class="text-sm" />
        </h2>
      </a>
    </div>

    <span class="flex-auto"></span>

    <span class="cursor-pointer" @click="handleChangeLang">
      <svg-icon name="translate" class="text-xl" />
      <span>· </span>
      <span class="text-sm">{{ userStore.lang === 'zh' ? '中' : 'En' }}</span>
    </span>

    <span class="mt-0.5 h-4 w-px bg-gray-400 dark:bg-gray-600"></span>

    <span
      class="cursor-pointer items-center gap-2 sm:flex"
      @click="userStore.toggleTheme"
      :title="userStore.theme === 'light' ? $t('darkMode') : $t('lightMode')"
    >
      <svg-icon
        :name="userStore.theme === 'light' ? 'moon' : 'sun'"
        class="text-xl"
      />
      <span class="text-sm">{{ userStore.theme === 'light' ? $t('darkMode') : $t('lightMode') }}</span>
    </span>

    <a :href="BRAND_URI">
      <svg-icon name="github" class="text-xl hover:opacity-50" />
    </a>
  </header>
</template>

<script setup>
import { useUserStore } from '@/store/user';
import { BRAND_URI } from '@/constants';

const userStore = useUserStore();
const { userinfo } = userStore;

const handleChangeLang = () => {
  const newLang = userStore.lang === 'zh' ? 'en' : 'zh';
  userStore.$patch({ lang: newLang });
};
</script>
