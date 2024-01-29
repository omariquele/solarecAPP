// src/boot/global-components.js
import { boot } from 'quasar/wrappers'
import BgImageComponent from 'components/BgImageComponent.vue'

export default boot(({ app }) => {
  app.component('BgImageComponent', BgImageComponent)
})
