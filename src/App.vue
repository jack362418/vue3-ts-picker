<template>
  <div class="app">
    <ColorPicker @changePickerColorBen="changeFontSize" :color="color" /> 
  </div>
</template>

<script lang="ts">
import {defineComponent,ref} from 'vue'
import ColorPicker from '@/components/colorPicker/index.vue'
// import ColorPicker from 'vue3-ts-picker'
//  "build": "vue-cli-service build --target lib ./src/components/colorPicker/index.ts",
//"main": "dist/vue3-ts-picker.umd.min.js",
export default defineComponent({
  name: 'picker',
  components:{ 
    ColorPicker
  },
   setup() {
    const color = ref('rgba(158,77,139,0.5)')
    const changeFontSize = (color: string) => {
      console.log('color', color)
    }

    return {
      changeFontSize,
      color
    }
  }
})
</script>

<style lang="scss">
  .app{
    height: 100%;
  }
</style>
