// import './assets/main.css'
import 'vuetify/styles'

import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import pinia from './stores'
import './styles/main.scss'

const app = createApp(App)

app.use(vuetify)
app.use(pinia) // Используйте Pinia

app.mount('#app')
