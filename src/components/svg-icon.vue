<template>
  <svg
    v-html="svgContent"
    class="svg-icon"
    :class="`svg-icon__${name}`"
    style="fill: currentColor; stroke: currentColor"
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

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  stroke: currentColor;
}
</style>
