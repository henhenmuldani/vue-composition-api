<template>
  <h3>History</h3>
  <ul id="list" class="list">
    <li v-for="t in transactions" :key="t.id" :class="t.amount < 0 ? 'minus' : 'plus'">
      {{ t.text }}
      <span>${{ t.amount }}</span>
      <button @click="deleteTransaction(t.id)" class="delete-btn">x</button>
    </li>

    <!-- <li class="minus">Cash <span>-$400</span><button class="delete-btn">x</button></li>
    <li class="plus">Paycheck <span>$800</span><button class="delete-btn">x</button></li> -->
  </ul>
</template>

<script setup>
import { defineProps } from 'vue'

const emit = defineEmits(['transactionDeleted'])

//* props transactions
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  transactions: {
    type: Array,
    required: true
  }
})

const deleteTransaction = (id) => {
  emit('transactionDeleted', id)
}
</script>

<!-- <script>
export default {
  //* Options API
  data() {
    return {
      transactions: [
        { id: 1, text: 'Flower', amount: -20 },
        { id: 2, text: 'Salary', amount: 300 },
        { id: 3, text: 'Book', amount: -10 },
        { id: 4, text: 'Camera', amount: 150 }
      ]
    }
  }
  //* Composition API
  //bisa juga dengan menambahkan setup di script contoh ada dibawah
  setup() {
    const transactions = [
      { id: 1, text: 'Flower', amount: -20 },
      { id: 2, text: 'Salary', amount: 300 },
      { id: 3, text: 'Book', amount: -10 },
      { id: 4, text: 'Camera', amount: 150 }
    ]
    return {
      transactions
    }
  }
}
</script> -->

<!-- <script setup>
//* Composition API dengan menambahkan setup di script
const transactions = [
  { id: 1, text: 'Flower', amount: -20 },
  { id: 2, text: 'Salary', amount: 300 },
  { id: 3, text: 'Book', amount: -10 },
  { id: 4, text: 'Camera', amount: 150 }
]
</script> -->

<style lang="scss" scoped></style>
