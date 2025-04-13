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

const studentId = route.params.id
const isEdit = studentId != undefined;

console.log("Student ID: ", studentId, isEdit);

let isSaving = false;
let isLoading = false
let studentData = reactive({
    name: "",
    roll_number: 0,
    image: "http://localhost:8000/upload_media/student_images/obs-coffee-color-bg.jpg",
    mobile_number: 1234567890,
    email: ""
});

let file = null;
const formData = new FormData();
const onFileChange = (event) => {
    try {
        file = event.target.files[0];
        formData.append('image', file)
        console.log("onFIle Chnage Form Data: ", formData);
    } catch (error) {
        console.log("Error while fetching the file", error)
    }
}

async function loadStudentData() {
    try {
        console.log(isEdit);
        if (!isEdit) return
        isLoading = true;
        const response = await axios.get(`/api/students/${studentId}`)
        Object.assign(studentData, response.data)
        console.log(studentData, response.data);
    } catch (error) {
        console.log("Error while fetching student data: ", error)
    } finally {
        isLoading = false;
    }
}

async function saveStudent() {
    try {
        isSaving = true;
        formData.append('name', studentData.name);
        formData.append('roll_number', studentData.roll_number);
        formData.append('email', studentData.email);
        formData.append('mobile_number', studentData.mobile_number);

        console.log("Form Data: ", formData);

        let response = null
        if (isEdit) {
            response = await axios.put(`/api/students/${studentId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRFToken': Cookies.get('csrftoken'),
                },
                withCredentials: true,
            })
        } else {
            response = await axios.post(`/api/students/`, formData, {
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

onMounted(() => loadStudentData());
</script>

<template>
    <div class="px-2 py-4">
        <h1 class="fs-2 fw-semibold text-center mx-auto mb-1">
            <i class="pi pi-user"></i>
            Add Student Details
        </h1>
        <hr>
        <form @submit.prevent="saveStudent" class="row g-3 mt-4">
            <!-- Student name -->
            <div class="col-md-6">
                <label for="student-name" class="form-label">Student Name</label>
                <input type="text" class="form-control" id="student-name" v-model="studentData.name" required>
            </div>

            <!-- Roll Number -->
            <div class="col-md-6">
                <label for="roll-number" class="form-label">Roll Number</label>
                <input type="text" class="form-control" id="roll-number" v-model="studentData.roll_number" required>
            </div>

            <!-- email -->
            <div class="col-md-6">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="studentData.email" required>
            </div>

            <!-- mobile number -->
            <div class="col-md-4">
                <label for="mobile-number" class="form-label">Mobile Number</label>
                <div class="input-group">
                    <span class="input-group-text" id="country-code">+91</span>
                    <input type="tel" class="form-control" id="mobile-number" v-model="studentData.mobile_number"
                        required>
                </div>
            </div>


            <!-- Student Image -->
            <div class="col-md-12 mt-5">
                <label for="student-profile-image" class="form-label">Student Profile Image</label>
                <!-- show image box -->
                <div class="py-2">
                    <img :src="studentData.image" alt="profile-image" class="img-thumbnail rounded float-start"
                        width="200" height="200">
                </div>
                <input type="file" class="form-control" v-on:change="onFileChange" id="student-profile-image"
                    accept="image/*" >
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