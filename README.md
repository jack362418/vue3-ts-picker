

 
# vue3-ts-picker
[![npm version](https://img.shields.io/npm/v/vue3-ts-picker.svg?style=flat-square)](http://badge.fury.io/js/vue3-ts-picker) 
[![npm downloads](https://img.shields.io/npm/dm/vue3-ts-picker.svg?style=flat-square)](http://badge.fury.io/js/vue3-ts-picker)
![vue](https://img.shields.io/badge/vue-3.0.0-green.svg)

# 描述  
![输入图片说明](https://gitee.com/calmjhy_admin/picker/raw/master/picker_img/preview-picker.png)
这是一款基于 vue3+ts 的轻量级颜色取色器插件  

## npm
```bash

npm install --save vue3-ts-picker

```
## yarn

```bash

$ yarn add save vue3-ts-picker

```
# code

main.js:

```javascript

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";   


import {ColorPicker} from "vue3-ts-picker"
import "vue3-ts-picker/dist/vue3-ts-picker.css"

const app = createApp(App)
app.component('ColorPicker', ColorPicker)
app.mount('#app')
 


```

template:

```javascript

<template>
  <div id="nav">
     <ColorPicker  @changePickerColorBen="changeFontSize" :color="color"/> 
  </div> 
</template>


<script lang="ts">
import {defineComponent,ref} from 'vue'  
export default defineComponent({
  name: 'picker', 
  setup() {
      const color = ref("#ccc")
      const changeFontSize = (color: string) => {
          console.log("color",color)
      }

      return {
          changeFontSize,
          color
      }
  }
})
</script>

```
