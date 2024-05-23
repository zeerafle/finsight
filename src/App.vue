<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <nav class="navbar bg-neutral">
    <div class="navbar-center">
      <RouterLink to="/" >
      <div class="text-4xl">Finsight</div>
      </RouterLink>
    </div>
  </nav>
  <RouterView />
</template>

<style scoped>
</style>
