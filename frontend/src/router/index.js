import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { routes } from './routes'
import StudentsView from '@/views/StudentsView.vue'
import CoursesView from '@/views/CoursesView.vue'
import AddStudentView from '@/views/AddStudentView.vue'
import AddCourseView from '@/views/AddCourseView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: routes.home.path,
      name: routes.home.name,
      component: HomeView,
    },
    {
      path: routes.students.path,
      name: routes.students.name,
      component: StudentsView,
    },
    {
      path: routes.courses.path,
      name: routes.courses.name,
      component: CoursesView,
    },
    {
      path: routes.add_student.path,
      name: routes.add_student.name,
      component: AddStudentView,
    },
    {
      path: routes.add_course.path,
      name: routes.add_course.name,
      component: AddCourseView,
    },
    {
      path: routes.edit_student.path + ":id",
      name: routes.edit_student.name,
      component: AddStudentView,
    },
    {
      path: routes.edit_course.path + ":id",
      name: routes.edit_course.name,
      component: AddCourseView,
    },
  ],
})

export default router
