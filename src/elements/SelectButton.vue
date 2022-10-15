<template>
  <select class="select" @change="onChange" v-model="selected">
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
import { defineProps, defineEmits, PropType, computed } from "vue";

interface Option {
  value: string | undefined;
  label: string | undefined;
}

const emits = defineEmits(["change"]);
const props = defineProps({
  options: Array as PropType<Option[]>,
  selected: String,
});

const selected = computed({
  get: () => {
    const value = props.selected || props.options?.[0]?.value;
    emits("change", value);
    return value;
  },
  set: (value) => {
    emits("change", value);
  },
});
</script>

<style>
.select {
  -webkit-appearance: none;
  appearance: none;
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
