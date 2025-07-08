import '@shgk/vue-course-ui/meetups/style.css'
import './MapApp.css'
import { createApp } from 'vue'
import MapApp from './MapApp.js'

// createApp(MapApp).mount('#app')
const app = createApp(MapApp)
const vm = app.mount('#app')
window.vm = vm
