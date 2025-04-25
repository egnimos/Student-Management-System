<script setup>
import Loader from '@/components/Loader.vue';
import ModalComp from '@/components/ModalComp.vue';
import { routes } from '@/router/routes';
import { CourseModel } from '@/models/courseModel';
import { useCourseStore } from '@/stores/courseStore';
import { useModalStore } from '@/stores/modalStore';
import { APIStatus } from '@/utilities/enums';
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';


const route = useRoute()
const router = useRouter()
const toast = useToast()

const courseId = route.params.id
const isEdit = courseId !== undefined

/** @type {CourseModel} */
let courseData = reactive(CourseModel.default())

/** @type {import('@/stores/courseStore').useCourseStore} */
const courseStore = useCourseStore()

// /** @type {import('@/stores/modalStore').useModalStore} */
// const modalStore = useModalStore()

function onFileChange(event) {
  try {
    /** @type {File} */
    const file = event.target.files[0];
    courseData.image_file = file;
  } catch (error) {
    console.log("Failed to fetch the file: " + error)
    toast.error("Failed to fetch the file: " + error)
  }
}

async function saveCourse() {
  try {
    const formData = courseData.toFormData()
    if (isEdit) {
      await courseStore.updateCourse(courseId, formData)
    } else {
      await courseStore.createCourse(formData)
    }

    //route back to courses detail screen
    router.push(routes.courses.path);
    toast.success("Saved Succesfully");
  } catch (error) {
    //TODO: Invoke a popup when error occurs
    console.log("Failed to save course data: " + error)
    toast.error("Failed to save course data: " + error)
  }
}

onMounted(async () => {
  if (!isEdit) return
  const cdata = await courseStore.getCourse(courseId)
  Object.assign(courseData, cdata);
})

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
          <img :src="courseData.thumbnail" alt="thumbnail" class="img-thumbnail rounded float-start" width="200"
            height="200">
        </div>
        <input type="file" class="form-control" v-on:change="onFileChange" id="thumbnail" accept="image/*">
      </div>

      <!-- submit -->
      <Loader v-if="isSaving" />
      <div v-else class="col-12">
        <button class="btn btn-secondary" type="submit">
          <i class="pi pi-save"></i>
          Save</button>
      </div>
    </form>
  </div>
</template>