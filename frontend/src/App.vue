<script setup>
import Navbar from '@/components/Navbar.vue';
import HomeView from '@/views/HomeView.vue';
</script>

<template>
  <div class="container py-4">
    <Navbar />
    <br>
    <RouterView />
  </div>
</template>