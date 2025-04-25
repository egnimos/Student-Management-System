<script setup>
import { RouterLink, useRoute } from 'vue-router';
import { routes } from '@/router/routes';
import { onMounted } from 'vue';

const isActive = (path) => {
    const route = useRoute().path;
    return path === route
}

const addCollaspe = () => {
    const collapseClass = "collapse";
    const classList = document.getElementById('navbarSupportedContent').classList;
    if (classList.contains(collapseClass)) {
        classList.remove(collapseClass)
        return;
    }
    classList.add(collapseClass)
}

onMounted(() => {
    addCollaspe();
})
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary ps-1 py-2">
        <div class="container-fluid">
            <RouterLink class="navbar-brand fw-medium fs-4" :to="routes.home.path">Student Management System
            </RouterLink>

            <!-- hamburger menu  -->
            <button class="navbar-toggler" type="button" @click="addCollaspe()">
                <span class="navbar-toggler-icon"></span>
            </button>


            <div class="navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav justify-content-center flex-grow-1 pe-3">
                    <li class="nav-item">
                        <RouterLink :class="[
                            'nav-link fw-medium fs-5 mx-2', isActive(routes.home.path) ? 'active' : '']"
                            aria-current="page" :to="routes.home.path">
                            Home</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink :class="[
                            'nav-link fw-medium fs-5 mx-2', isActive(routes.students.path) ? 'active' : '']"
                            aria-current="page" :to="routes.students.path">
                            Student</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink :class="[
                            'nav-link fw-medium fs-5 mx-1', isActive(routes.courses.path) ? 'active' : '']"
                            :to="routes.courses.path">
                            Courses</RouterLink>
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