import {  ref,computed,watchEffect,onMounted,Ref } from 'vue'
import { pickerColorHsvRgba } from "../../../types/shape"
export default (pickerColorHsv: pickerColorHsvRgba,hsv:Ref<number[]>) => { 
    const pickerSliderBarEle = ref<HTMLElement>()
        
        const pickerColorBar = ref(0) 
        const hsvPop =  computed(() => hsv.value)
        onMounted(() => {
            watchEffect(() => {
                if(!hsvPop.value.length && hsvPop.value.length <= 1){
                    pickerColorBar.value = 0
                    return
                }
                if (!pickerSliderBarEle.value){
                    pickerColorBar.value = 0
                    return
                }
                const { width } = pickerSliderBarEle.value.getBoundingClientRect()
                let left = width / 360 * hsvPop.value[0]
                pickerColorBar.value = Math.round(left / width * 100)
            })
        }) 

       

   

        const handleChangePickerBar = (e:MouseEvent) => {
            if (!pickerSliderBarEle.value) return
            const { width,x } = pickerSliderBarEle.value.getBoundingClientRect()
            pickerColorBar.value = ((e.clientX - x) / width) * 100
            pickerColorHsv.h = Math.round((e.clientX - x) / width * 360)
            document.onmousemove = (e:MouseEvent) => {
                if(e.clientX <= x) {
                    pickerColorBar.value = 0
                    pickerColorHsv.h = 0
                }else if((e.clientX - x) >= width) {
                    pickerColorBar.value = 100
                    pickerColorHsv.h = 0
                }else {
                    pickerColorBar.value = ((e.clientX - x) / width) * 100
                    pickerColorHsv.h = Math.round((e.clientX - x) / width * 360)
                }
            }
            document.onmouseup = () => {
                document.onmousemove = null
                document.onmouseup = null
            }
        } 
        return {
            pickerSliderBarEle,
            pickerColorBar,
            handleChangePickerBar
        }
}