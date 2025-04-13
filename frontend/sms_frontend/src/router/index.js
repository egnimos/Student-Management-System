import CoursesView from "@/view/CoursesView.vue";
import HomeView from "@/view/HomeView.vue";
import StudentsView from "@/view/StudentsView.vue";
import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import AddStudentView from "@/view/AddStudentView.vue";
import AddCourseView from "@/view/AddCourseView.vue";
import CourseDetailView from "@/view/CourseDetailView.vue";
import StudentDetailView from "@/view/StudentDetailView.vue";
import AddEnrollementView from "@/view/AddEnrollementView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: routes.home_view,
            name: "home_view",
            component: HomeView
        },
        {
            path: routes.student_view,
            name: "student_view",
            component: StudentsView
        },
        {
            path: routes.course_view,
            name: "course_view",
            component: CoursesView
        },

        {
            path: routes.add_student,
            name: "add_student",
            component: AddStudentView
        },
        {
            path: routes.add_course,
            name: "add_course",
            component: AddCourseView
        },

        {
            path: routes.edit_student + '/:id',
            name: "edit_student",
            component: AddStudentView
        },
        {
            path: routes.edit_course + '/:id',
            name: "edit_course",
            component: AddCourseView
        },

        {
            path: routes.student_view + '/:id',
            name: "student_d_view",
            component: StudentDetailView
        },
        {
            path: routes.course_view + '/:id',
            name: "course_d_view",
            component: CourseDetailView
        },

        {
            path: routes.add_enrollement,
            name: "add_enrollement",
            component: AddEnrollementView
        },
        {
            path: routes.edit_enrollement + '/:id',
            name: "edit_enrollement",
            component: AddEnrollementView
        },
    ]
})

export default router