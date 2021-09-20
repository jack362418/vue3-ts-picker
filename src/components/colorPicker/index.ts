import { App } from 'vue'
import colorPicker from './index.vue'
import pickerSvpanel from './pickerSvpanel.vue'
import colorBar from './colorBar.vue'
import colorSlider from './colorSlider.vue'
 
export const Com  = {
    install(app: App) {
      app.component('pickerSvpanel', pickerSvpanel) 
      app.component('colorBar', colorBar) 
      app.component('colorSlider', colorSlider) 
    }
}
  
export default colorPicker

//  "typings": "dist/index.d.ts",