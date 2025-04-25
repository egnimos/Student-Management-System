<script setup>
import Loader from '@/components/Loader.vue';
import TableComp from '@/components/TableComp.vue';

import { routes } from '@/router/routes';

import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStudentStore } from '@/stores/studentStore';
import { APIStatus } from '@/utilities/enums';

const studentStore = useStudentStore()
const router = useRouter()


const goToAddStudentPage = () => {
    router.push(routes.add_student.path)
}

const columns = ['Id', 'Roll Number', 'Student Profile Image', 'Student Name', 'Email', 'Mobile Number', 'Delete', 'Update']
function editStudentData(id) {
    router.push(routes.edit_student.path + id);
}

// function navToDetailsPage(data) {
//     const studentData = {
//         id: data[0],
//         roll_number: data[1],
//         image: data[2],
//         name: data[3],
//         email: data[4],
//         mobile_number: data[5],
//     }
//     router.push({
//         // path: routes.student_view + '/' + studentData.id,
//         name: "student_d_view",
//         params: { id: studentData.id },
//         query: {
//             data: JSON.stringify(studentData),
//         }
//     })
// }
onMounted(async () => {
    await studentStore.getListofStudents()
})
</script>

<template>
    <Loader v-if="studentStore.apiStatus.fetchStatus == APIStatus.LOADING" />
    <div v-else class="pt-5 align-item-center">
        <div class="row">
            <div class="col-9 col-sm-9">
                <h4 class="fw-600 fs-3">Students</h4>
            </div>
            <div class="col col-sm">
                <div class="d-flex flex-row">
                    <!-- refresh the student list -->
                    <a @click="studentStore.getListofStudents()" class="fs-4 me-4 mt-2 text-secondary refresh-icon">
                        <i class="pi pi-refresh"></i>
                        <span class="fw-medium">Refresh</span>
                    </a>


                    <!-- add student -->
                    <button class="btn btn-secondary" v-on:click="goToAddStudentPage">
                        <i class="pi pi-plus"></i>
                        Add Student
                    </button>
                </div>
            </div>
        </div>
    </div>
    <hr>
    <TableComp :columns="columns" :data="studentStore.studentData" :editData="editStudentData" :deleteData="null" />
</template>


<style scoped>
.refresh-icon {
    text-decoration: none;
    cursor: pointer;
}
</style>