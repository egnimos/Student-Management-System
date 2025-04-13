import './assets/main.css'
import { createApp } from 'vue'
import 'primeicons/primeicons.css';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import 'bootstrap/dist/css/bootstrap.css';
// import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle';
import router from './router'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(Toast)

app.mount('#app')
