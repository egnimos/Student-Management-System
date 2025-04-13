<script setup>
import TableComp from '@/components/TableComp.vue';
import routes from '@/router/routes';
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

const router = useRouter()

const stateData = reactive({
    courses: [],
    isLoading: true
})

async function loadCourseData() {
    try {
        const response = await axios.get(`/api/courses/`)
        stateData.courses = response.data
        console.log(response.data)
        // time complexity of o(n)
        const transformedcourses = response.data.map((d) => [
            d.id,
            d.thumbnail,
            d.title,
            d.description,
            'delete',
            'edit'
        ]);
        stateData.courses = transformedcourses;
        console.log(stateData.courses);
    } catch (error) {
        console.log("Error while fetching courses data: ", error)
    } finally {
        stateData.isLoading = false;
    }
}

const goToAddCoursePage = () => {
    router.push(routes.add_course)
}

async function deleteCourseData(id) {
    try {
        console.log("Deleting ID: ", id);
        await axios.delete(`/api/courses/${id}`, {
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            withCredentials: true,
        })
    } catch (error) {
        console.log("Error while deleting courses data: ", error)
        throw error
    }
}

const columns = ['Id', 'Image/Thumbnail', 'Title', 'Description', 'Delete', 'Update']
function editCourseData(id) {
    router.push(routes.edit_course + '/' + id);
}

onMounted(() => loadCourseData())
</script>

<template>
    <PulseLoader v-if="stateData.isLoading"/>
    <div v-else class="pt-5 align-item-center">
        <div class="row">
            <div class="col-9 col-sm-9">
                <h4 class="fw-600 fs-3">Courses</h4>
            </div>
            <div class="col col-sm">
                <div class="d-flex flex-row">
                    <!-- refresh the student list -->
                    <a @click="loadCourseData" class="fs-4 me-4 mt-2 text-secondary refresh-icon">
                        <i class="pi pi-refresh"></i>
                        <span class="fw-medium">Refresh</span>
                    </a>


                    <!-- add student -->
                    <button class="btn btn-secondary" v-on:click="goToAddCoursePage">
                        <i class="pi pi-plus"></i>
                        Add Course
                    </button>
                </div>
            </div>
        </div>
    </div>
    <hr>
    <TableComp :columns="columns" 
    :data="stateData.courses" 
    :editData="editCourseData" 
    :deleteData="deleteCourseData"
    />
</template>


<style scoped>
.refresh-icon {
    text-decoration: none;
    cursor: pointer;
}
</style>