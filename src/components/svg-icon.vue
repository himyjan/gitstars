<template>
  <div
    class="svg-icon fill-current stroke-current text-gray-600 dark:text-gray-400"
    :class="`svg-icon__${name}`"
    v-html="svgContent"
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
</script>

<style>
.svg-icon {
  width: 1em;
  height: 1em;
  display: inline-flex;
  align-items: center;
}

.svg-icon svg {
  width: 100%;
  height: 100%;
  fill: currentColor !important;
  stroke: currentColor !important;
}

.svg-icon svg * {
  fill: currentColor !important;
  stroke: currentColor !important;
}
</style>
