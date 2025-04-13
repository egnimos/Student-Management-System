<script setup>
import { RouterLink, useRoute } from 'vue-router';
import routes from '@/router/routes';

const isActive = (path) => {
  const routePath = useRoute().path
  return routePath === path
}
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary ps-1 py-2">
    <div class="container-fluid">
      <RouterLink class="navbar-brand fw-medium fs-4" :to="routes.home_view">Student Management System</RouterLink>

      <!-- hamburger menu  -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>


      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav justify-content-center flex-grow-1 pe-3">
          <li class="nav-item">
            <RouterLink :class="[
              'nav-link fw-medium fs-5 mx-2', isActive(routes.home_view) ? 'active': '']" 
              aria-current="page" 
              :to="routes.home_view">
              Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :class="[
              'nav-link fw-medium fs-5 mx-2', isActive(routes.student_view) ? 'active': '']" 
              aria-current="page" 
              :to="routes.student_view">
              Student</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink :class="[
              'nav-link fw-medium fs-5 mx-1', isActive(routes.course_view) ? 'active': '']"  :to="routes.course_view">Courses</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.active {
  border: 2px solid;
  border-left: none;
  border-right: none;
  border-top: none;
}
</style>