import { createApp } from 'vue'
//import { createPinia } from 'pinia'
import Vuex from 'vuex'
import store from './stores/store'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(Vuex)
app.use(store)
app.use(router)

app.mount('#app')
