import { createApp } from 'vue'
import App from './App.vue'
import { vReveal } from './composables/reveal'
import './styles/global.scss'

createApp(App).directive('reveal', vReveal).mount('#app')
