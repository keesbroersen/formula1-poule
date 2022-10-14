<template>
  <button class="button" :class="`button--${props.type}`" :disabled="loading">
    <slot v-if="!loading" />
    <span v-else>loading...</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { defineProps } from "vue";

const props = defineProps({
  type: {
    type: String,
    required: false,
    default: "",
  },
});

const loading = computed(() => {
  return props.type === "loading";
});
</script>
