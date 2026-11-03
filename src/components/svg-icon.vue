<template>
  <svg
    class="svg-icon fill-current stroke-current text-gray-600 dark:text-gray-400"
    :class="`svg-icon__${name}`"
    :view-box="viewBox"
    v-html="innerContent"
  />
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const svgModules = import.meta.glob('../svg-icons/*.svg?raw', {
  eager: true,
});

const svgContent = computed(() => {
  const key = Object.keys(svgModules).find((k) =>
    k.endsWith(`/${props.name}.svg?raw`),
  );
  return key ? svgModules[key].default : '';
});

const viewBox = computed(() => {
  const key = Object.keys(svgModules).find((k) =>
    k.endsWith(`/${props.name}.svg?raw`),
  );
  if (!key) return undefined;
  const match = svgModules[key].default.match(/viewBox="([^"]+)"/);
  return match ? match[1] : undefined;
});

const innerContent = computed(() => {
  const key = Object.keys(svgModules).find((k) =>
    k.endsWith(`/${props.name}.svg?raw`),
  );
  if (!key) return '';
  return svgModules[key]
    .default
    // Strip opening <svg ...> tag
    .replace(/^<svg[^>]*>/, '')
    // Strip closing </svg> tag
    .replace(/<\/svg>$/, '')
    .trim();
});
</script>
