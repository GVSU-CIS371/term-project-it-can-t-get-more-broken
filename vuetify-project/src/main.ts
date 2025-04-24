/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { mdiAccount } from '@mdi/js'

const app = createApp(App)
const icons = { mdiAccount }

registerPlugins(app)

app.mount('#app')
