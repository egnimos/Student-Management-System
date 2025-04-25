import { defineStore } from "pinia";
import axios from "axios";
import Cookies from 'js-cookie';
import { APIStatus } from "@/utilities/enums";
import { ref, reactive } from "vue";
import { StudentModel } from "@/models/studentModel";

export const useStudentStore = defineStore('student', () => {
    /** @type {import('vue').Ref<Array<Array<any>>>} */
    const studentData = ref([])

    /**
     * @type {{
     * savingStatus: APIStatus, 
    *  fetchStatus: APIStatus, 
    *  deleteStatus: APIStatus 
     * }}
     */
    const apiStatus = reactive({
        savingStatus: APIStatus.UNKNOWN,
        fetchStatus: APIStatus.UNKNOWN,
        deleteStatus: APIStatus.UNKNOWN,
    })

    /** @param {FormData} formData */
    async function createStudent(formData) {
        try {
            apiStatus.savingStatus = APIStatus.LOADING
            const response = await axios.post(`/api/students/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRFToken': Cookies.get('csrftoken'),
                },
                withCredentials: true,
            })

            console.log(response)
        } catch (error) {
            console.log("Error while creating a student data: ", error)
            throw error
        } finally {
            apiStatus.savingStatus = APIStatus.UNKNOWN
        }
    }

    /** 
     * @param {number} studentId
     * @param {FormData} formData 
    */
    async function updateStudent(studentId, formData) {
        try {
            apiStatus.savingStatus = APIStatus.LOADING
            console.log("Form Data: ", formData);
            // let response = null
            const response = await axios.put(`/api/students/${studentId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRFToken': Cookies.get('csrftoken'),
                },
                withCredentials: true,
            })

            console.log(response)

            // TODO: update the list locally
        } catch (error) {
            console.log("Error while updating student data: ", error)
            throw error
        } finally {
            apiStatus.savingStatus = APIStatus.UNKNOWN
        }
    }

    /**
     * Delete the Student
     * @param {number} studentId
    */
    async function deleteStudent(studentId) {
        try {
            apiStatus.deleteStatus = APIStatus.LOADING
            console.log("Deleting ID: ", studentId);
            await axios.delete(`/api/students/${studentId}`, {
                headers: {
                    'X-CSRFToken': Cookies.get('csrftoken'),
                },
                withCredentials: true,
            })

            //TODO: update the list locally
        } catch (error) {
            console.log("Error while deleting student data: ", error)
            throw error
        } finally {
            apiStatus.deleteStatus = APIStatus.UNKNOWN
        }
    }

    /**
     * Fetch a list of students
     * @param {number} studentId
     * @returns {StudentModel}
    */
    async function getStudent(studentId) {
        try {
            apiStatus.fetchStatus = APIStatus.LOADING
            const response = await axios.get(`/api/students/${studentId}`)
            const data = response.data
            return new StudentModel(data)
        } catch (error) {
            console.log("Error while fetching student data: ", error)
            throw error 
        } finally {
            apiStatus.fetchStatus = APIStatus.UNKNOWN
        }
    }


    /**
     * Fetch the list of students
    */
    async function getListofStudents() {
        try {
            apiStatus.fetchStatus = APIStatus.LOADING
            const response = await axios.get(`/api/students/`)
            // studentData.value = response.data
            console.log(response.data)
            // time complexity of o(n)
            const transformedStudents = response.data.map((d) => [
                d.id,
                d.roll_number,
                d.profile_pic,
                d.name,
                d.email,
                d.mobile_number,
                'delete',
                'edit'
            ]);
            studentData.value = transformedStudents;
            console.log(studentData.value);
        } catch (error) {
            console.log("Error while fetching student data: ", error)
            throw error
        } finally {
            apiStatus.fetchStatus = APIStatus.UNKNOWN
        }
    }


    return {
        getListofStudents, deleteStudent,
        updateStudent, createStudent, getStudent,
        studentData, apiStatus
    };
})