import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App).mount('#app');
app.use(require('vue-moment'))