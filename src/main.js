// import './assets/main.css'
import 'vuetify/styles'
import './styles/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from "./router.js";
import {createPinia} from "pinia";

const app = createApp(App)
const pinia = createPinia();

app.use(vuetify)
app.use(pinia)
app.use(router)

app.mount('#app')
