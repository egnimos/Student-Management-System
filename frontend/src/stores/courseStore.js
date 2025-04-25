import { APIStatus } from "@/utilities/enums";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import axios from "axios";
import { CourseModel } from "@/models/courseModel";

export const useCourseStore = defineStore('course', () => {
    /** @type {import('vue').Ref<Array<Array<any>>>} */
    const courseData = ref([])

    /**
     * @type {{
     * savingStatus: APIStatus,
     * fetchStatus: APIStatus,
     * deleteStatus: APIStatus,
     * }}
     */
    const apiStatus = reactive({
        savingStatus: APIStatus.UNKNOWN,
        fetchStatus: APIStatus.UNKNOWN,
        deleteStatus: APIStatus.UNKNOWN,
    })

    /** @param {FormData} formData */
    async function createCourse(formData) {
        try {
            apiStatus.savingStatus = APIStatus.LOADING
            const response = await axios.post(`/api/courses/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRFToken': Cookies.get('csrftoken'),
                },
                withCredentials: true,
            })

            console.log(response);
        } catch (error) {
            console.log("Error while creating a course data: ", error)
            throw error
        } finally {
            apiStatus.savingStatus = APIStatus.UNKNOWN
        }
    }

    /** 
     * @param {number} courseId
     * @param {FormData} formData 
    */
    async function updateCourse(courseId, formData) {
        try {
            apiStatus.savingStatus = APIStatus.LOADING
            console.log("Form Data: ", formData);
            const response = await axios.put(`/api/courses/${courseId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRFToken': Cookies.get('csrftoken'),
                },
                withCredentials: true,
            })

            console.log(response);
        } catch (error) {
            console.log("Error while updating course data: ", error)
            throw error
        } finally {
            apiStatus.savingStatus = APIStatus.UNKNOWN
        }
    }

    /**
     * @param {number} courseId 
     */
    async function deleteCourse(courseId) {
        try {
            apiStatus.deleteStatus = APIStatus.LOADING
            console.log("Deleting ID: ", courseId);
            await axios.delete(`/api/courses/${courseId}`, {
                headers: {
                    'X-CSRFToken': Cookies.get('csrftoken'),
                },
                withCredentials: true,
            })
        } catch (error) {
            console.log("Error while deleting course data: ", error)
            throw error
        } finally {
            apiStatus.deleteStatus = APIStatus.UNKNOWN
        }
    }

    /**
     * Fetch a single coursedata
     * @param {number} courseId
     * @returns {CourseModel}
    */
    async function getCourse(courseId) {
        try {
            apiStatus.fetchStatus = APIStatus.LOADING
            const response = await axios.get(`/api/courses/${courseId}`)
            const data = response.data
            return new CourseModel(data)
        } catch (error) {
            console.log("Error while fetching course data: ", error)
            throw error
        } finally {
            apiStatus.fetchStatus = APIStatus.UNKNOWN
        }
    }

    async function getListofCourses() {
        try {
            apiStatus.fetchStatus = APIStatus.LOADING;
            const response = await axios.get(`/api/courses/`)
            // courseData.value = response.data
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
            courseData.value = transformedcourses;
            console.log(courseData.value);
        } catch (error) {
            console.log("Error while fetching course data: ", error)
        } finally {
            apiStatus.fetchStatus = APIStatus.UNKNOWN;
        }
    }


    return {
        courseData, apiStatus,
        getListofCourses, createCourse,
        updateCourse, deleteCourse, getCourse,
    };
})