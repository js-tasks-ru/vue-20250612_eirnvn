import { defineComponent, ref, onMounted, onUnmounted } from 'vue'

function calculateTime() {
  return new Date().toLocaleTimeString(navigator.language, { timeStyle: 'medium' })
}

export default defineComponent({
  name: 'UiClock',

  setup() {
    const timeout = ref(null)
    const time = ref(calculateTime())

    const updateTime = () => {
      time.value = calculateTime()
      timeout.value = setTimeout(updateTime, 1000)
    }
    onMounted(() => {
      timeout.value = setTimeout(updateTime, 1000)
    })
    onUnmounted(() => {
      clearTimeout(timeout.value)
    })

    return {
      time,
      timeout,
    }
  },

  template: `<div class="clock">{{ time }}</div>`,
})
