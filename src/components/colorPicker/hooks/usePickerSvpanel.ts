import { ref,computed,onMounted,Ref,watchEffect } from 'vue'
import { pickerColorHsvRgba } from "../../../types/shape"
export default (pickerColorHsv: pickerColorHsvRgba,hsv:Ref<number[]>) => { 
    const pickerColorSvpanel = ref<HTMLElement>()
    const pickerColorSvpCursor = ref({
        top:0,
        left:0
    })
    
    const hsvPop =  computed(() => hsv.value)
     

    onMounted(() => { 
        watchEffect(() => {
            if(!hsvPop.value.length &&  hsvPop.value.length <= 1){
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
            let left = width / 100 * hsvPop.value[1]
            let top = (100 -  hsvPop.value[2]) / 100 * height
            pickerColorSvpCursor.value.left = Math.round(left / width * 100)
            pickerColorSvpCursor.value.top = Math.round(top / height * 100)
        }) 
    })
    
    const handleChangePickerSvpanel = (e:MouseEvent) => {
        if (!pickerColorSvpanel.value) return
        const { width,height,x,y } = pickerColorSvpanel.value.getBoundingClientRect()
        pickerColorSvpCursor.value.top = (e.clientY - y) / height * 100
        pickerColorSvpCursor.value.left = (e.clientX - x) / width * 100
        pickerColorHsv.s = (e.clientX - x) / width * 100
        pickerColorHsv.v = (1-((e.clientY - y)/height)) * 100
        let moveX = 0
        let moveY = 0 
        document.onmousemove = (e:MouseEvent) => {
            moveX = (e.clientX - x) / width * 100
            moveY = (e.clientY - y) / height * 100
            pickerColorHsv.s = (e.clientX - x) / width * 100
            pickerColorHsv.v = (1-((e.clientY - y)/height)) * 100
            if(e.clientX <= x) {
                moveX = 0
                pickerColorHsv.s = 0
            }
            if((e.clientX - x) >= width) {
                moveX = 100
                pickerColorHsv.s = 100
            }
            if(e.clientY <= y) {
                moveY = 0
                pickerColorHsv.v = 100    
            }
            if(e.clientY >= (y+height)) {
                moveY = 100
                pickerColorHsv.v = 0
            }
            pickerColorSvpCursor.value.top = moveY
            pickerColorSvpCursor.value.left = moveX 
        }
        document.onmouseup = () => {
            document.onmousemove = null
            document.onmouseup = null
        }
    }

   
    return {
        handleChangePickerSvpanel,
        pickerColorSvpCursor,
        pickerColorSvpanel
    }
}