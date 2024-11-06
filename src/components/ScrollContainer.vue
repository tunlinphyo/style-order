<template>
  <div class="scroll-container">
    <slot />
  </div>
</template>

<style scoped>
.scroll-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
  background-color: hotpink;
}

.scroll-container::-webkit-scrollbar {
  width: 20px;
}

.scroll-container::-webkit-scrollbar-track {
  background: #fff;
  padding: 4px;
}

.scroll-container::-webkit-scrollbar-thumb {
  background: #999;
  border-radius: 20px;
  border: 4px solid #fff;
}

@media (max-width: 1200px) {
  .scroll-container {
    overflow: initial;
  }
}
</style>