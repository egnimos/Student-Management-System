<script setup>
import { useRoute, useRouter } from 'vue-router';
import TableComp from '@/components/TableComp.vue';
import DetailsCard from '@/components/DetailsCard.vue';
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import Cookies from 'js-cookie';
import routes from '@/router/routes';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

const route = useRoute()
const router = useRouter()
const columns = ["Id", "Grade", "Marksheet", 'Delete', 'Update']
console.log(route.query.data)
const studentData = JSON.parse(route.query.data);


const enrollmentsData = reactive({
    isLoading: true,
    data: []
})

async function deleteEnrollement(id) {
    try {
        console.log("Deleting ID: ", id);
        await axios.delete(`/api/enrollements/${id}`, {
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            withCredentials: true,
        })
    } catch (error) {
        console.log("Error while deleting enrollement data: ", error)
        throw error
    }
}

async function getStudentEnrollements() {
    try {
        const response = await axios.get(`/api/enrollements/?student_id=${studentData.id}`)
        // stateData.students = response.data
        console.log(response.data)
        // time complexity of o(n)
        const transformedEnrollments = response.data.map((d) => [
            d.id,
            d.grade,
            d.marksheet,
            'delete',
            'edit'
        ]);
        enrollmentsData.data = transformedEnrollments;
        console.log(enrollmentsData.data);
    } catch (error) {
        console.log("Error while fetching enrollments data: ", error)
    } finally {
        enrollmentsData.isLoading = false;
    }
}

function navigateToCreateEnrollements() {
    router.push({
        name: "add_enrollement",
        query: {
            student_id: studentData.id
        }
    })
}

function editEnrollement(id) {
    router.push(routes.edit_enrollement + '/' + id)
}

onMounted(() => {
    getStudentEnrollements()
})

</script>

<template>
    <PulseLoader v-if="enrollmentsData.isLoading" />
    <div v-else>
        <br>
        <DetailsCard :title="studentData.name" :image="studentData.image" :subtitle="studentData.email"
            :description="`${studentData.mobile_number}`" />
        <br>
        <div class="pt-5 align-item-center">
            <div class="row">
                <div class="col-9 col-sm-9">
                    <h4 class="fw-600 fs-3">Enrollements</h4>
                </div>
                <div class="col col-sm">
                    <div class="d-flex flex-row">
                        <!-- refresh the student list -->
                        <a @click="getStudentEnrollements" class="fs-4 me-4 mt-2 text-secondary refresh-icon">
                            <i class="pi pi-refresh"></i>
                            <span class="fw-medium">Refresh</span>
                        </a>


                        <!-- add student -->
                        <button class="btn btn-secondary" v-on:click="navigateToCreateEnrollements">
                            <i class="pi pi-plus"></i>
                            Enrollements
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <hr>
    <TableComp :columns="columns" :data="enrollmentsData.data" :deleteData="deleteEnrollement"
        :editData="editEnrollement" />
</template>


<style scoped>
.refresh-icon {
    text-decoration: none;
    cursor: pointer;
}
</style>