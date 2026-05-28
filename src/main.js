import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './styles/main.css'

// Google Fonts
const link = document.createElement('link')
link.rel = 'stylesheet'
link.href =
  'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600&family=Noto+Sans+Khmer:wght@400;500;600&display=swap'

document.head.appendChild(link)

createApp(App)
  .use(createPinia())
  .use(router)
  .mount('#app')