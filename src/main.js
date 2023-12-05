import { createApp } from 'vue'

//* import vue-toastification dan style nya
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import './assets/style.css'
import App from './App.vue'

//* cara menggunakan vue-toastification
const app = createApp(App)
app.use(Toast)
app.mount('#app')
