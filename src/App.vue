<template>
  <div class="app">
    <ColorPicker /> 
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import ColorPicker from '@/components/colorPicker/index.vue'
// import ColorPicker from 'vue3-ts-picker'
//  "build": "vue-cli-service build --target lib ./src/components/colorPicker/index.ts",
//"main": "dist/vue3-ts-picker.umd.min.js",
export default defineComponent({
  name: 'picker',
  components:{ 
    ColorPicker
  },
})
</script>

<style lang="scss">
  .app{
    height: 100%;
  }
</style>
