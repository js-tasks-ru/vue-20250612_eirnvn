import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CounterApp',

  setup() {
    const min = 0
    const max = 5

    const count = ref(min)

    function increment() {
      if (count.value < max) {
        count.value += 1
      }
    }
    function decrement() {
      if (count.value > min) {
        count.value -= 1
      }
    }

    return {
      min,
      max,
      count,
      increment,
      decrement,
    }
  },

  template: `
    <div class="counter">
      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        :disabled="count === min"
        @click="decrement"
      >➖</button>

      <span class="count" data-testid="count">{{ count }}</span>

      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        :disabled="count === max"
        @click="increment"
      >➕</button>
    </div>
  `,
})
