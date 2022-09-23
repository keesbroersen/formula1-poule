<template>
  <div class="sticky-block">
    <slot />
  </div>
</template>

<style>
.sticky-block {
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: calc(100vw - 24px);
  left: 12px;
  bottom: 12px;
}
</style>
