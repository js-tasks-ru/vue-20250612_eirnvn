import { defineComponent, createApp } from 'vue'

const App = defineComponent({
  name: 'App',

  setup() {
    return {
      date: new Date().toLocaleDateString(navigator.language, { day: 'numeric', month: 'long', year: 'numeric' }),
    }
  },

  template: `<div>Сегодня {{ date }} </div>`,
})

const app = createApp(App)

app.mount('#app')
