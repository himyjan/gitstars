<template>
  <component
    :is="Icon"
    class="svg-icon fill-current stroke-current text-gray-600 dark:text-gray-400"
  />
</template>

<script setup>
import { computed } from 'vue'

import allApplicationSvg from '../svg-icons/all-application.svg?raw'
import branchSvg from '../svg-icons/branch.svg?raw'
import closeSvg from '../svg-icons/close.svg?raw'
import githubSvg from '../svg-icons/github.svg?raw'
import handLeftSvg from '../svg-icons/hand-left.svg?raw'
import linkSvg from '../svg-icons/link.svg?raw'
import loadingSvg from '../svg-icons/loading.svg?raw'
import logoSvg from '../svg-icons/logo.svg?raw'
import moonSvg from '../svg-icons/moon.svg?raw'
import searchSvg from '../svg-icons/search.svg?raw'
import shareSvg from '../svg-icons/share.svg?raw'
import sortAscendSvg from '../svg-icons/sort-ascend.svg?raw'
import sortDescendSvg from '../svg-icons/sort-descend.svg?raw'
import starFillSvg from '../svg-icons/star-fill.svg?raw'
import starSvg from '../svg-icons/star.svg?raw'
import sunSvg from '../svg-icons/sun.svg?raw'
import tagSvg from '../svg-icons/tag.svg?raw'
import timeSvg from '../svg-icons/time.svg?raw'
import translateSvg from '../svg-icons/translate.svg?raw'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})

const svgComponents = {
  'all-application': { template: allApplicationSvg },
  branch: { template: branchSvg },
  close: { template: closeSvg },
  github: { template: githubSvg },
  'hand-left': { template: handLeftSvg },
  link: { template: linkSvg },
  loading: { template: loadingSvg },
  logo: { template: logoSvg },
  moon: { template: moonSvg },
  search: { template: searchSvg },
  share: { template: shareSvg },
  'sort-ascend': { template: sortAscendSvg },
  'sort-descend': { template: sortDescendSvg },
  'star-fill': { template: starFillSvg },
  star: { template: starSvg },
  sun: { template: sunSvg },
  tag: { template: tagSvg },
  time: { template: timeSvg },
  translate: { template: translateSvg },
}

const Icon = computed(() => svgComponents[props.name])
</script>

<style>
.svg-icon {
  width: 1em;
  height: 1em;
  display: inline-flex;
  align-items: center;
  fill: currentColor !important;
  stroke: currentColor !important;
}

.svg-icon * {
  fill: currentColor !important;
  stroke: currentColor !important;
}
</style>
