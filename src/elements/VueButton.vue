<template>
  <button class="button" :class="`button--${props.type}`">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  type: {
    type: String,
    required: false,
    default: "",
  },
});
</script>
