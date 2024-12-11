/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: "#101820",
          secondary: "#1F4E79",
          bgDrawer: '#101820',
          card_bg: "#FFDDE6",
          alternate: "#E64261",
          header: "#09033A",
          btn_bg: "#5C51F3",
          toolbar: "#dbe5f0",
          main_bg: "#e9f0f8",
          ngRed: '#D32129', //newgas red,
          ngYellow: "#FFB800" //newgas yellow
        }
      }
    }
  },
})
