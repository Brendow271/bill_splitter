// import './assets/main.css'
// import 'vuetify/styles'
// import './styles/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import pinia from './stores'
import router from "@/router.js";

const app = createApp(App)

app.use(vuetify)
app.use(pinia)
app.use(router)

app.mount('#app')
