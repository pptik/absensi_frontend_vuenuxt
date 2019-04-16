<template>
  <div class="page-container">
    <nuxt />
  </div>
</template>

<style lang="scss" scoped>
  .md-app {
    height: 100vh;
    border: 1px solid rgba(#000, .12);
  }
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
</style>

<script>

/**
  * NuxtJS Vue Instance
  */
export default {
  name: 'loginarea'
}
</script>
