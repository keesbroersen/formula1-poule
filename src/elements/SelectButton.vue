<template>
  <select class="select" @change="onChange">
    <option
      v-for="option in props.options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, PropType } from "vue";

interface Option {
  value: string;
  label: string;
}

const props = defineProps({
  options: Array as PropType<Option[]>,
});

const emits = defineEmits(["change"]);

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emits("change", target.value);
};
</script>

<style>
.select {
  -webkit-appearance: none;
  border: none;
  height: 32px;
  max-width: 300px;
  padding: 0 12px;
  border-radius: 3px;
  outline: none;
  background: var(--background-opacity);
  color: white;
  font-family: var(--font);
}
</style>
