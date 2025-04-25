<script setup>
import TableComp from "@/components/TableComp.vue";
import Loader from "@/components/Loader.vue";

import { APIStatus } from '@/utilities/enums';
import { onMounted } from 'vue';
import { useCourseStore } from "@/stores/courseStore";
import { routes } from '@/router/routes';
import { useRouter } from 'vue-router';

const courseStore = useCourseStore();
const router = useRouter();
const columns = ['Id', 'Image/Thumbnail', 'Title', 'Description', 'Delete', 'Update']

const goToAddCoursePage = () => {
    router.push(routes.add_course.path)
}

const goToEditCoursePage = () => {
    router.push(routes.add_course.path + id);
}

onMounted(() => {
    courseStore.getListofCourses()
})
</script>

<template>
    <Loader v-if="courseStore.apiStatus == APIStatus.LOADING" />
    <div v-else class="pt-5 align-item-center">
        <div class="row">
            <div class="col-9 col-sm-9">
                <h4 class="fw-600 fs-3">Courses</h4>
            </div>
            <div class="col col-sm">
                <div class="d-flex flex-row">
                    <!-- refresh the course list -->
                    <a @click="courseStore.getListofCourses()" class="fs-4 me-4 mt-2 text-secondary refresh-icon">
                        <i class="pi pi-refresh"></i>
                        <span class="fw-medium">Refresh</span>
                    </a>


                    <!-- add course -->
                    <button class="btn btn-secondary" v-on:click="goToAddCoursePage">
                        <i class="pi pi-plus"></i>
                        Add Course
                    </button>
                </div>
            </div>
        </div>
    </div>
    <hr>
    <TableComp :columns="columns" :data="courseStore.courseData" :editData="goToEditCoursePage" :deleteData="null" />
</template>


<style scoped>
.refresh-icon {
    text-decoration: none;
    cursor: pointer;
}
</style>