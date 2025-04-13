<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { reactive } from 'vue';
import Cookies from 'js-cookie';
import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

const route = useRoute()
const router = useRouter()
const toast = useToast()

const student_id = route.query.student_id
const enrollmentId = route.params.id
const isEdit = enrollmentId != undefined
const grades = ["A", "B", "C", "D", "E", "F"]
let isSaving = false;
let isLoading = false
let enrollData = reactive({
    student_id: student_id,
    course_id: 0,
    grade: "A",
    marksheet: "http://localhost:8000/upload_media/files/turnitin-report.pdf",
});

let file = null;
const formData = new FormData();
const onFileChange = (event) => {
    try {
        file = event.target.files[0];
        formData.append('marksheet', file)
        console.log("onFIle Chnage Form Data: ", formData);
    } catch (error) {
        console.log("Error while changing the file", error)
    }
}

async function saveoreditEnrollement(id) {
    try {
        isSaving = true;

        formData.append('grade', enrollData.grade);
        formData.append('course_id', enrollData.course_id);
        formData.append('student_id', student_id);

        console.log("Form Data: ", formData);

        let response = null
        if (isEdit) {
            response = await axios.put(`/api/enrollements/${enrollmentId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRFToken': Cookies.get('csrftoken'),
                },
                withCredentials: true,
            })
        } else {
            response = await axios.post(`/api/enrollements/`, formData, {
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


async function getStudentEnrollements() {
    try {
        isLoading = true;
        const response = await axios.get(`/api/enrollements/${enrollmentId}`)
        // stateData.students = response.data
        console.log("response", response.data)
        // time complexity of o(n)
        Object.assign(enrollData, response.data)
    } catch (error) {
        console.log("Error while fetching enrollments data: ", error)
    } finally {
        isLoading = false;
    }
}

let courses = ref([])
async function getCourses() {
    try {
        isLoading = true;
        const response = await axios.get(`/api/courses/`)
        // stateData.students = response.data
        console.log(response.data)
        // time complexity of o(n)
        courses.value = response.data
    } catch (error) {
        console.log("Error while fetching courses data: ", error)
    } finally {
        isLoading = false;
    }
}

async function getCourse(id) {
    try {
        isLoading = true;
        console.log(id)
        const response = await axios.get(`/api/courses/${id}`)
        // stateData.students = response.data
        console.log(response.data)
        // time complexity of o(n)
        courses.value = [response.data]
    } catch (error) {
        console.log("Error while fetching course data: ", error)
    } finally {
        isLoading = false;
    }
}


onMounted(async () => {
    try {
        if (isEdit) {
            await getStudentEnrollements()
            await getCourse(enrollData.course_id)
        } else {
            await getCourses()
        }
    } catch (error) {
        console.log("error: ", error)
    }
})
</script>

<template>
    <div class="px-2 py-4">
        <h1 class="fs-2 fw-semibold text-center mx-auto mb-1">
            <i class="pi pi-book"></i>
            Add Enrollements Details
        </h1>
        <hr>
        <form @submit.prevent="saveoreditEnrollement" class="row g-3 mt-4">
            <!-- Grade -->
            <div class="col-md-6">
                <label for="grade" class="form-label">Grade</label>
                <div class="input-group mb-3">
                    <!-- <button class="btn btn-outline-secondary dropdown-toggle" type="button"
                        aria-expanded="false">{{ enrollData.grade || 'Choose Grade' }}</button> -->
                    <select class="form-select" v-model="enrollData.grade" required>
                        <option value="" disabled selected>Choose Grade</option>
                        <option v-for="grade in grades" :key="grade" :value="grade">
                            {{ grade }}
                        </option>
                    </select>
                    <!-- <input type="text" class="form-control" id="grade" v-model="enrollData.grade" readonly required> -->
                </div>
            </div>

            <!-- course -->
            <div class="col-md-6 ">
                <label for="course" class="form-label">Course</label>
                <div class="input-group mb-3">

                    <select class="form-select" v-model="enrollData.course_id" required>
                        <option value="" disabled selected>Choose Courses</option>
                        <option v-for="course in courses" :key="course.id" :value="course.id">
                            {{ course.title }}
                        </option>
                    </select>
                    <!-- <input type="text" class="form-control" v-model="enrollData.course_id" aria-label="Text input with dropdown button"> -->
                </div>
            </div>

            <!-- Marksheet -->
            <div class="col-md-12 mt-2">
                <label for="marksheet" class="form-label">Marksheet</label>
                <!-- show image box -->
                <div class="mb-1">
                    <a :href="enrollData.marksheet" download>Download PDF</a>
                </div>
                <input type="file" class="form-control" v-on:change="onFileChange" id="marksheet"
                    accept="application/pdf" required>
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