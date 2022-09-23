<template>
  <button class="button"><slot></slot></button>
</template>

<style>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  min-height: 50px;
  width: 100%;
  background: var(--background-opacity);
  color: #fff;
  line-height: 1;
  -webkit-appearance: none;
  -moz-appearance: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: var(--font);
  font-size: 18px;
}

.button svg {
  margin-right: 8px;
}

.button:hover {
  opacity: 0.9;
}

.button:active {
  transform: translateY(1px);
}

.primary,
.primarySticky,
.primaryForm {
  background: #fff;
  color: #000;
}

.primarySticky {
  position: fixed;
  left: 12px;
  bottom: 12px;
  width: calc(100vw - 24px);
}

.primaryForm {
  margin: 12px;
  width: calc(100vw - 24px);
}
</style>
