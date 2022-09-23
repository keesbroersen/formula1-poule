<template>
  <component :is="svg" />
</template>

<script setup lang="ts">
import { defineProps, defineAsyncComponent, computed } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const svg = computed(() => {
  return defineAsyncComponent(() => import(`@/assets/${props.name}.vue`));
});
</script>
