<script setup>
import axios from 'axios';
import getCookie from '../utility'
import Cookies from 'js-cookie';
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

const route = useRoute()
const router = useRouter()
const toast = useToast()

const courseId = route.params.id
const isEdit = courseId != undefined;

console.log("Course ID: ", courseId, isEdit);

let isSaving = false;
let isLoading = false
let courseData = reactive({
    title: "",
    description: "Write a description",
    thumbnail: "http://localhost:8000/upload_media/student_images/obs-coffee-color-bg.jpg",
});

let file = null;
const formData = new FormData();
const onFileChange = (event) => {
    try {
        file = event.target.files[0];
        formData.append('thumbnail', file)
        console.log("onFIle Chnage Form Data: ", formData);
    } catch (error) {
        console.log("Error while changing the file", error)
    }
}

async function loadCourseData() {
    try {
        console.log(isEdit);
        if (!isEdit) return
        isLoading = true;
        const response = await axios.get(`/api/courses/${courseId}`)
        Object.assign(courseData, response.data)
        console.log(courseData, response.data);
    } catch (error) {
        console.log("Error while fetching courses data: ", error)
    } finally {
        isLoading = false;
    }
}

async function saveCourse() {
    try {
        isSaving = true;
        formData.append('title', courseData.title);
        formData.append('description', courseData.description);

        console.log("Form Data: ", formData);

        let response = null
        if (isEdit) {
            response = await axios.put(`/api/courses/${courseId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRFToken': Cookies.get('csrftoken'),
                },
                withCredentials: true,
            })
        } else {
            response = await axios.post(`/api/courses/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRFToken': Cookies.get('csrftoken'),
                },
                withCredentials: true,
            })
        }
        toast.success("Saved Successfully")
        router.back()
    } catch (error) {
        console.log("Error while saving the file: ", error)
        toast.error("Failed to save")
    } finally {
        isSaving = false;
    }
}

onMounted(() => loadCourseData());
</script>

<template>
    <div class="px-2 py-4">
        <h1 class="fs-2 fw-semibold text-center mx-auto mb-1">
            <i class="pi pi-course"></i>
            Add Course Details
        </h1>
        <hr>
        <form @submit.prevent="saveCourse" class="row g-3 mt-4">
            <!-- Course Title-->
            <div class="col-md-12">
                <label for="title" class="form-label">Title</label>
                <input type="text" class="form-control" id="title" v-model="courseData.title" required>
            </div>
            <br>
            <!-- Course Description -->
            <div class="col-md-12">
                <label for="course-description" class="form-label">Course Description</label>
                <textarea type="text" class="form-control" id="course-description" v-model="courseData.description"
                    required></textarea>
            </div>


            <!-- Thumbnail / Image -->
            <div class="col-md-12 mt-5">
                <label for="thumbnail" class="form-label">Thumbnail / Image</label>
                <!-- show image box -->
                <div class="py-2">
                    <img :src="courseData.thumbnail" alt="thumbnail" class="img-thumbnail rounded float-start"
                        width="200" height="200">
                </div>
                <input type="file" class="form-control" v-on:change="onFileChange" id="thumbnail" accept="image/*"
                    >
            </div>

            <!-- submit -->
            <PulseLoader v-if="isSaving"/>
            <div v-else class="col-12">
                <button class="btn btn-secondary" type="submit">
                    <i class="pi pi-save"></i>
                    Save</button>
            </div>
        </form>
    </div>
</template>