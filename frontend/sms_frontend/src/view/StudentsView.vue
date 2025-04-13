<script setup>
import TableComp from '@/components/TableComp.vue';
import routes from '@/router/routes';
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';

const router = useRouter()

const stateData = reactive({
    students: [],
    isLoading: true
})

async function loadStudentData() {
    try {
        stateData.isLoading = true;
        const response = await axios.get(`/api/students/`)
        stateData.students = response.data
        console.log(response.data)
        // time complexity of o(n)
        const transformedStudents = response.data.map((d) => [
            d.id,
            d.roll_number,
            d.image,
            d.name,
            d.email,
            d.mobile_number,
            'delete',
            'edit'
        ]);
        stateData.students = transformedStudents;
        console.log(stateData.students);
    } catch (error) {
        console.log("Error while fetching student data: ", error)
    } finally {
        stateData.isLoading = false;
    }
}

const goToAddStudentPage = () => {
    router.push("/add/student")
}

async function deleteStudentData(id) {
    try {
        console.log("Deleting ID: ", id);
        await axios.delete(`/api/students/${id}`, {
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            withCredentials: true,
        })
    } catch (error) {
        console.log("Error while deleting student data: ", error)
        throw error
    }
}

const columns = ['Id', 'Roll Number', 'Student Profile Image', 'Student Name', 'Email', 'Mobile Number', 'Delete', 'Update']
function editStudentData(id) {
    router.push(routes.edit_student + '/' + id,);
}

function navToDetailsPage(data) {
    const studentData = {
        id: data[0],
        roll_number: data[1],
        image: data[2],
        name: data[3],
        email: data[4],
        mobile_number: data[5],
    }
    router.push({
        // path: routes.student_view + '/' + studentData.id,
        name: "student_d_view",
        params: { id: studentData.id },
        query: {
            data: JSON.stringify(studentData),
        }
    })
}
onMounted(() => loadStudentData())
</script>

<template>
    <div class="pt-5 align-item-center">
        <div class="row">
            <div class="col-9 col-sm-9">
                <h4 class="fw-600 fs-3">Students</h4>
            </div>
            <div class="col col-sm">
                <div class="d-flex flex-row">
                    <!-- refresh the student list -->
                    <a @click="loadStudentData" class="fs-4 me-4 mt-2 text-secondary refresh-icon">
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
    <TableComp :columns="columns" :data="stateData.students" :editData="editStudentData" :deleteData="deleteStudentData"
        :col_name_clickable="columns[3]" :navigate="navToDetailsPage" />
</template>


<style scoped>
.refresh-icon {
    text-decoration: none;
    cursor: pointer;
}
</style>