import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const operand1 = ref(0)
    const operand2 = ref(0)
    const operator = ref('sum') // 'sum' , 'subtract', 'multiply', 'divide'

    const operators = {
      sum: (a, b) => a + b,
      subtract: (a, b) => a - b,
      multiply: (a, b) => a * b,
      divide: (a, b) => a / b,
    }
    const result = computed(() => {
      return operators[operator.value](operand1.value, operand2.value)
    })
    return {
      operand1,
      operand2,
      operator,
      result,
    }
  },

  template: `
    <div class="calculator">
      <input type="number" v-model="operand1" aria-label="First operand" />

      <div class="calculator__operators">
        <label><input type="radio"  v-model="operator" name="operator" value="sum"/>➕</label>
        <label><input type="radio"  v-model="operator" name="operator" value="subtract"/>➖</label>
        <label><input type="radio"  v-model="operator" name="operator" value="multiply"/>✖</label>
        <label><input type="radio"  v-model="operator" name="operator" value="divide"/>➗</label>
      </div>

      <input type="number" v-model="operand2" aria-label="Second operand" />

      <div>=</div>

      <output>{{ result }}</output>
    </div>
  `,
})
