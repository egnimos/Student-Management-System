<script setup>
import { RouterView } from 'vue-router';
import Navbar from '@/components/Navbar.vue'

</script>

<template>
  <div class="container py-4">
    <Navbar />
    <br>
    <RouterView />
  </div>
</template>