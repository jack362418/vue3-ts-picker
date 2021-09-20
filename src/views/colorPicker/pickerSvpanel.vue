<template>
  <div class="pickerSvpanel">
     <div class="picker-color-svpanel" :style="{'background': pickerColorSvpanelBg}" ref="pickerColorSvpanel" @mousedown.stop="$event => handleChangePickerSvpanel($event)">
        <div class="picker-color-svpanel__white picker-com"></div>
        <div class="picker-color-svpanel__black picker-com"></div>
        <div class="picker-color-svpanel__cursor" :style="{
            top: pickerColorSvpCursor.top + '%',
            left: pickerColorSvpCursor.left + '%'
        }">
            <div class="pointer"></div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref,PropType,computed,watch,onMounted } from 'vue'
import { pickerColorHsvRgba } from "@/types/shape"
export default defineComponent({
  name: 'pickerSvpanel',
  props: {
      pickerColorHsv: {
            type: Object as PropType<pickerColorHsvRgba>,
            required: true,
      },
      pickerColorSvpanelBg: {
            type: Object,
            required: true,
      },
      hsv: {
            type: Array as PropType<number[]>,
            required: true,
      }
  },
  setup(props,{ emit }) {
        const pickerColorSvpanel = ref<HTMLElement>()
        const pickerColorSvpCursor = ref({
            top:0,
            left:0
        })
        const propPickerColorHsv = computed(() => {
            return {
                    h: props.pickerColorHsv.h,
                    s: props.pickerColorHsv.s,
                    v: props.pickerColorHsv.v,
                    a: props.pickerColorHsv.a
                }
            
        })
        
        onMounted(() => {
            watch(() => props.hsv,() => {
                if(!props.hsv.length && props.hsv.length <= 1){
                    pickerColorSvpCursor.value.top = 0
                    pickerColorSvpCursor.value.left = 0
                    return
                }
                if (!pickerColorSvpanel.value){
                    pickerColorSvpCursor.value.top = 0
                    pickerColorSvpCursor.value.left = 0
                    return
                }
                const { width,height } = pickerColorSvpanel.value.getBoundingClientRect()
                let left = width / 100 * props.hsv[1]
                let top = (100 - props.hsv[2]) / 100 * height
                pickerColorSvpCursor.value.left = Math.round(left / width * 100)
                pickerColorSvpCursor.value.top = Math.round(top / height * 100)
            })
        })
        

        const handleChangePickerSvpanel = (e:MouseEvent) => {
            if (!pickerColorSvpanel.value) return
            const { width,height,x,y } = pickerColorSvpanel.value.getBoundingClientRect()
            pickerColorSvpCursor.value.top = (e.clientY - y) / height * 100
            pickerColorSvpCursor.value.left = (e.clientX - x) / width * 100
            propPickerColorHsv.value.s = (e.clientX - x) / width * 100
            propPickerColorHsv.value.v = (1-((e.clientY - y)/height)) * 100
            let moveX = 0
            let moveY = 0
            changeEmit()
            document.onmousemove = (e:MouseEvent) => {
                moveX = (e.clientX - x) / width * 100
                moveY = (e.clientY - y) / height * 100
                propPickerColorHsv.value.s = (e.clientX - x) / width * 100
                propPickerColorHsv.value.v = (1-((e.clientY - y)/height)) * 100
                if(e.clientX <= x) {
                    moveX = 0
                    propPickerColorHsv.value.s = 0
                }
                if((e.clientX - x) >= width) {
                    moveX = 100
                    propPickerColorHsv.value.s = 100
                }
                if(e.clientY <= y) {
                    moveY = 0
                    propPickerColorHsv.value.v = 100    
                }
                if(e.clientY >= (y+height)) {
                    moveY = 100
                    propPickerColorHsv.value.v = 0
                }
                pickerColorSvpCursor.value.top = moveY
                pickerColorSvpCursor.value.left = moveX
                changeEmit()
            }
            document.onmouseup = () => {
                document.onmousemove = null
                document.onmouseup = null
            }
        }

        const changeEmit = () => {
            emit('colorChange', {
                    h:propPickerColorHsv.value.h,
                    s:propPickerColorHsv.value.s,
                    v:propPickerColorHsv.value.v,
                    a:propPickerColorHsv.value.a,
                })
        }
        return {
            handleChangePickerSvpanel,
            pickerColorSvpCursor,
            pickerColorSvpanel
        }
  }
})
</script>
<style lang="scss" scoped>
    .pickerSvpanel{
        .picker-color-svpanel{
            position: relative;
            height: 180px;
            cursor: pointer;
            .picker-color-svpanel__white{
                background: linear-gradient(90deg,#fff,hsla(0,0%,100%,0));
            }
            .picker-color-svpanel__black{
                background: linear-gradient(0deg,#000,transparent);
            }
            .picker-color-svpanel__cursor{
                position: absolute;
                .pointer{
                    width: 4px;
                    height: 4px;
                    box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,0.3), 0 0 1px 2px rgba(0,0,0,0.4);
                    border-radius: 50%;
                    transform: translate(-2px,-2px);
                }
            }
            .picker-com{
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
            }
        }
    }
</style>