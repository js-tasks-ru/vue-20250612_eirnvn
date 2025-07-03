import { defineComponent, createApp } from 'vue'

const App = defineComponent({
  name: 'App',
  template: `<div>Сегодня ${new Date().toLocaleDateString(navigator.language, { day: 'numeric', month: 'long', year: 'numeric' })}</div>`,
})

const app = createApp(App)

app.mount('#app')
