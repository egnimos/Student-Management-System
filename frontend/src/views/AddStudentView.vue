<script setup>
import Loader from '@/components/Loader.vue';

import { useRoute, useRouter } from 'vue-router';
import { StudentModel } from '@/models/studentModel';
import { useStudentStore } from '@/stores/studentStore';
import { useModalStore } from '@/stores/modalStore';
import { APIStatus } from '@/utilities/enums';
import { useToast } from 'vue-toastification';
import { routes } from '@/router/routes';
import { onMounted, reactive } from 'vue';


const route = useRoute()
const router = useRouter()

const studentId = route.params.id
const isEdit = studentId !== undefined;

const toast = useToast()
/** @type {StudentModel} */
let studentData = reactive(StudentModel.default())

/** @type {import('@/stores/studentStore').useStudentStore} */
const studentStore = useStudentStore()

// /** @type {import('@/stores/modalStore').useModalStore} */
// const modalStore = useModalStore()

function onFileChange(event) {
  try {
    /** @type {File} */
    const file = event.target.files[0];
    studentData.image_file = file;
  } catch (error) {
    console.log("Failed to fetch the file: " + error)
    toast.error("Failed to fetch the file: " + error)
  }
}

async function saveStudent() {
  try {
    const formData = studentData.toFormData()
    if (isEdit) {
      await studentStore.updateStudent(studentId, formData)
    } else {
      await studentStore.createStudent(formData)
    }

    //route back to student detail screen
    router.push(routes.students.path);
    toast.success("Saved Succesfully");
  } catch (error) {
    //TODO: Invoke a popup when error occurs
    console.log("Failed to save student data: " + error)
    toast.error("Failed to save student data: " + error)
  }
}

onMounted(async () => {
  if (!isEdit) return
  const sdata = await studentStore.getStudent(studentId)
  Object.assign(studentData, sdata)
  console.log("STUDENT DATA: ", studentData);

})

</script>

<template>
  <Loader v-if="studentStore.apiStatus.fetchStatus == APIStatus.LOADING" />
  <div v-else class="px-2 py-4">
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
          <input type="tel" class="form-control" id="mobile-number" v-model="studentData.mobile_number" required>
        </div>
      </div>


      <!-- Student Image -->
      <div class="col-md-12 mt-5">
        <label for="student-profile-image" class="form-label">Student Profile Image</label>
        <!-- show image box -->
        <div class="py-2">
          <img :src="studentData.profile_pic" alt="profile-image" class="img-thumbnail rounded float-start" width="200"
            height="200">
        </div>
        <input type="file" class="form-control" v-on:change="onFileChange" id="student-profile-image" accept="image/*">
      </div>

      <!-- submit -->
      <Loader v-if="studentStore.apiStatus.savingStatus == APIStatus.LOADING" />
      <div v-else class="col-12">
        <button class="btn btn-secondary" type="submit">
          <i class="pi pi-save"></i>
          Save</button>

      </div>
    </form>
  </div>

</template>

<style scoped></style>