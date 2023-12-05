<template>
  <HeaderComponent />
  <div class="container">
    <BalanceComponent :total="+total" />
    <IncomeExpenses :income="+income" :expenses="+expenses" />
    <TransactionList :transactions="transactions" @transactionDeleted="handleTransactionDeleted" />
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
  </div>
</template>

<script setup>
import HeaderComponent from './components/HeaderComponent.vue'
import BalanceComponent from './components/BalanceComponent.vue'
import IncomeExpenses from './components/IncomeExpenses.vue'
import TransactionList from './components/TransactionList.vue'
import AddTransaction from './components/AddTransaction.vue'
import { useToast } from 'vue-toastification'

import { ref, computed, onMounted } from 'vue'

const toast = useToast()

//* Composition API dengan menambahkan setup di script
const transactions = ref([
  // { id: 1, text: 'Flower', amount: -20 },
  // { id: 2, text: 'Salary', amount: 300 },
  // { id: 3, text: 'Book', amount: -10 },
  // { id: 4, text: 'Camera', amount: 150 }
])
console.log(transactions) //jika dilihat datanya ada di transactions.value

onMounted(() => {
  const savedTransactions = JSON.parse(localStorage.getItem('transactions'))

  if (savedTransactions) {
    transactions.value = savedTransactions
  }
})

//* Mengolah data balance
//TODO cari tahu cara kerja fungsi ini
const total = computed(() => {
  return transactions.value.reduce((acc, transaction) => {
    return acc + transaction.amount
  }, 0)
})

//* Get Income
const income = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => {
      return acc + transaction.amount
    }, 0)
    .toFixed(2)
})

//* Get Expenses
const expenses = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => {
      return acc + transaction.amount
    }, 0)
    .toFixed(2)
})

//* Add Transaction
const handleTransactionSubmitted = (transactionData) => {
  console.log('Parent component', transactionData)
  transactions.value.push({
    id: generateUniqueId(),
    text: transactionData.text,
    amount: transactionData.amount
  })

  console.log(transactions)

  saveTransactionsToLocalStorage()

  toast.success('Transaction added successfully')
}

//* Generate Unique ID
const generateUniqueId = () => {
  return Math.floor(Math.random() * 1000000)
}

//Delete Transaction
const handleTransactionDeleted = (id) => {
  console.log('Parent component', id)
  transactions.value = transactions.value.filter((transaction) => transaction.id !== id)
  saveTransactionsToLocalStorage()
  toast.success('Transaction deleted successfully')
}

//* Save to local storage
const saveTransactionsToLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions.value))
}
</script>
