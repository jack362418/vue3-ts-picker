import { createApp } from 'vue'
import App from './App.vue' 
import '@/assets/styles/index.scss'
import { Com } from './components/colorPicker/index'

createApp(App)  
    .use(Com)
    .mount('#app')
    