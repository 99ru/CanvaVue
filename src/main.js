import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import VueKonva from 'vue-konva'

const app = createApp(App)

// Use VueKonva plugin
app.use(VueKonva)

app.mount('#app')
