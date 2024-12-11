/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import '@fontsource/poppins';

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)
app.use(autoAnimatePlugin)

app.mount('#app')
