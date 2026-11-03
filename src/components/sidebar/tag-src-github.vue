<template>
  <div class="flex h-0 flex-auto flex-col">
    <TagItem
      :tag="{
        label: t('all'),
        icon: 'all-application',
      }"
      :class="{ selected: !rankingStore.selectedLanguage }"
      class="mr-1 flex-none"
      @click="handleClickTagAll"
    />

    <TagSearch @input="handleInputSearch" />

    <ul class="flex-auto overflow-auto" @click="handleSelectTag">
      <TagItem
        v-for="language in languageList"
        :key="language"
        :tag="{
          label: language,
        }"
        :data-language="language"
        :class="{ selected: language === rankingStore.selectedLanguage }"
      />
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import SvgIcon from '@/components/svg-icon.vue';
import { useRankingStore } from '@/store/ranking';
import TagItem from './tag-item.vue';
import TagSearch from './tag-search.vue';

const { t } = useI18n();

const rankingStore = useRankingStore();
rankingStore.resolveLanguageList();
rankingStore.resolveLanguageMap();

const languageList = computed(() => {
  const filterText = rankingStore.filterText.toLowerCase();
  return rankingStore.languageList.filter((key) =>
    key.toLowerCase().includes(filterText),
  );
});

const handleClickTagAll = async () => {
  rankingStore.$patch({
    selectedLanguage: '',
  });
};

const handleInputSearch = (val) => {
  rankingStore.$patch({ filterText: val });
};

const handleSelectTag = async (e) => {
  let elTag = e.target;
  while (!elTag.dataset.language) {
    elTag = elTag.parentElement;
    if (!elTag) return;
  }

  const { language } = elTag.dataset;
  rankingStore.$patch({
    selectedLanguage: language,
  });
};
</script>
