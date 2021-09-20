<template>
  <div class="colorBar">
    <div class="content" ></div>
    <div class="picker-color-content-bar" ref="pickerSliderBarEle"  @mousedown="$event => handleChangePickerBar($event)">
        <div class="bar" :style="{
            left: pickerColorBar + '%'
        }"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref,PropType,computed,watch,onMounted } from 'vue'
import { pickerColorHsvRgba } from "@/types/shape"
export default defineComponent({
    name: 'colorBar',
    props: {
        pickerColorHsv: {
            type: Object as PropType<pickerColorHsvRgba>,
            required: true,
        },
        hsv: {
             type: Array as PropType<number[]>,
             required: true,
        }
    },
    setup(props,{ emit }) {
        const pickerSliderBarEle = ref<HTMLElement>()
        
        const pickerColorBar = ref(0)
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
                    pickerColorBar.value = 0
                    return
                }
                if (!pickerSliderBarEle.value){
                    pickerColorBar.value = 0
                    return
                }
                const { width } = pickerSliderBarEle.value.getBoundingClientRect()
                let left = width / 360 * props.hsv[0]
                pickerColorBar.value = Math.round(left / width * 100)
            })
        })

        


        const handleChangePickerBar = (e:MouseEvent) => {
            if (!pickerSliderBarEle.value) return
            const { width,x } = pickerSliderBarEle.value.getBoundingClientRect()
            pickerColorBar.value = ((e.clientX - x) / width) * 100
            propPickerColorHsv.value.h = Math.round((e.clientX - x) / width * 360)
            changeEmit()
            document.onmousemove = (e:MouseEvent) => {
                if(e.clientX <= x) {
                    pickerColorBar.value = 0
                    propPickerColorHsv.value.h = 0
                }else if((e.clientX - x) >= width) {
                    pickerColorBar.value = 100
                    propPickerColorHsv.value.h = 0
                }else {
                    pickerColorBar.value = ((e.clientX - x) / width) * 100
                    propPickerColorHsv.value.h = Math.round((e.clientX - x) / width * 360)
                }
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
            pickerSliderBarEle,
            pickerColorBar,
            handleChangePickerBar
        }
    }
})
</script>
<style lang="scss" scoped>
    .colorBar{
        .content{
            background: linear-gradient(90deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red);
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
        }
        .picker-color-content-bar{
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 2;
            .bar{
                position: absolute;
                cursor: pointer;
                box-sizing: border-box;
                top: 0;
                width: 4px;
                height: 100%;
                border-radius: 1px;
                background: #fff;
                border: 1px solid #f0f0f0;
                box-shadow: 0 0 2px rgba(0,0,0,0.6);
                z-index: 1;
            }
            
            
        }
    }
</style>