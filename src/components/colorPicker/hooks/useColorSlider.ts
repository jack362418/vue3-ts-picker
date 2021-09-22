import { ref,Ref,computed,onMounted,watchEffect} from 'vue'
import { pickerColorHsvRgba } from "../../../types/shape"
import { hsvtorgb } from '../../../until/index'
export default (pickerColorHsv: pickerColorHsvRgba,hsv:Ref<number[]>) => { 
    const pickerSliderSliderEle = ref<HTMLElement>()
    const pickerSliderSlider = ref(100)
 
    const hsvPop =  computed(() => hsv.value)

     onMounted(() => {
        watchEffect(() => {
            if(!hsvPop.value.length && hsvPop.value.length <= 1){
                pickerSliderSlider.value = 1
                return
            } 
            if(hsvPop.value.length > 3) { 
                pickerSliderSlider.value = Math.round( hsvPop.value[3] * 100)
            } 
        })
    })

    const pickerSliderBar = computed(() => {
      let bent = hsvtorgb(pickerColorHsv.h,pickerColorHsv.s,pickerColorHsv.v)
      return `linear-gradient(to right,rgba(${bent[0]},${bent[1]},${bent[2]},0) 0%, rgb(${bent[0]},${bent[1]},${bent[2]}) 100%)`
    })

    const handleChangePickerSlider = (e:MouseEvent) => {
        if (!pickerSliderSliderEle.value) return
        const { width,x } = pickerSliderSliderEle.value.getBoundingClientRect()
        pickerSliderSlider.value = ((e.clientX - x) / width) * 100
        pickerColorHsv.a = Math.round(pickerSliderSlider.value) / 100 
        document.onmousemove = (e:MouseEvent) => {
            if(e.clientX <= x) {
                pickerSliderSlider.value = 0
            }else if((e.clientX - x) >= width) {
                pickerSliderSlider.value = 100
            }else {
                pickerSliderSlider.value = ((e.clientX - x) / width) * 100
            }
            pickerColorHsv.a = Math.round(pickerSliderSlider.value) / 100 
        }
        document.onmouseup = () => {
            document.onmousemove = null
            document.onmouseup = null
        }
    } 
    return {
        handleChangePickerSlider,
        pickerSliderSliderEle,
        pickerSliderSlider,
        pickerSliderBar
    }
}