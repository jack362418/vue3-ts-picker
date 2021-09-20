<template>
  <div class="colorSlider">
    <div class="picker-color-alpha-slider" ref="pickerSliderSliderEle" @mousedown="$event => handleChangePickerSlider($event)">
        <div class="picker-color-alpha-slider__bar" :style="{background: pickerSliderBar}"></div>
        <div class="picker-color-alpha-slider__thumb" :style="{
            left: pickerSliderSlider + '%'
        }"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref,PropType,computed,onMounted,watch} from 'vue'
import { pickerColorHsvRgba } from "@/types/shape"
import { rgbtohsv,hsvtorgb } from '@/until/index'
export default defineComponent({
    name: 'colorSlider',
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
        const pickerSliderSliderEle = ref<HTMLElement>()
        const pickerSliderSlider = ref(100)
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
                    pickerSliderSlider.value = 1
                    return
                } 
                if(props.hsv.length > 3) {
                    console.log("props.hsv[3]",props.hsv[3])
                    pickerSliderSlider.value = Math.round( props.hsv[3] * 100)
                } 
            })
        })

        const pickerSliderBar = computed(() => {
          let bent = hsvtorgb(props.pickerColorHsv.h,props.pickerColorHsv.s,props.pickerColorHsv.v)
          return `linear-gradient(to right,rgba(${bent[0]},${bent[1]},${bent[2]},0) 0%, rgb(${bent[0]},${bent[1]},${bent[2]}) 100%)`
        })

        const handleChangePickerSlider = (e:MouseEvent) => {
            if (!pickerSliderSliderEle.value) return
            const { width,x } = pickerSliderSliderEle.value.getBoundingClientRect()
            pickerSliderSlider.value = ((e.clientX - x) / width) * 100
            propPickerColorHsv.value.a = Math.round(pickerSliderSlider.value) / 100
            changeEmit()
            document.onmousemove = (e:MouseEvent) => {
                if(e.clientX <= x) {
                    pickerSliderSlider.value = 0
                }else if((e.clientX - x) >= width) {
                    pickerSliderSlider.value = 100
                }else {
                    pickerSliderSlider.value = ((e.clientX - x) / width) * 100
                }
                propPickerColorHsv.value.a = Math.round(pickerSliderSlider.value) / 100
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
            handleChangePickerSlider,
            pickerSliderSliderEle,
            pickerSliderSlider,
            pickerSliderBar
        }
    }
})
</script>
<style lang="scss" scoped>
    .colorSlider{
        .picker-color-alpha-slider{
            position: relative;
            margin-top: 4px;
            height: 12px;
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==);
            .picker-color-alpha-slider__thumb{
                position: absolute;
                cursor: pointer;
                box-sizing: border-box;
                left: 0;
                top: 0;
                width: 4px;
                height: 100%;
                border-radius: 1px;
                background: #fff;
                border: 1px solid #f0f0f0;
                box-shadow: 0 0 2px rgba(0,0,0,0.6);
                z-index: 1;
            }
            .picker-color-alpha-slider__bar{
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
            }
        }
    }
</style>