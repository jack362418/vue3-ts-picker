<template>
  <div class="color-picker">
    <div class="svpanel">  
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
    </div>
    <div class="picker-color-bar">
        <div class="color-content">
            <div class="picker-current-color" :style="{'background': adsorbentColor}"></div>
        </div>
        <div class="color-slider">
            <div class="picker-color-barWraper"> 
                <div class="colorBar">
                    <div class="content" ></div>
                    <div class="picker-color-content-bar" ref="pickerSliderBarEle"  @mousedown="$event => handleChangePickerBar($event)">
                        <div class="bar" :style="{
                            left: pickerColorBar + '%'
                        }"></div>
                    </div>
                </div>
            </div> 
            <div class="colorSlider">
                <div class="picker-color-alpha-slider" ref="pickerSliderSliderEle" @mousedown="$event => handleChangePickerSlider($event)">
                    <div class="picker-color-alpha-slider__bar" :style="{background: pickerSliderBar}"></div>
                    <div class="picker-color-alpha-slider__thumb" :style="{
                        left: pickerSliderSlider + '%'
                    }"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="picker-color-dropdown__btns">
        <span>{{ isRgbMode ? adsorbentColor :  colorMode}}</span>
        <div class="picker-color-mode" @click="changeColorMode">
            <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
                <rect width="48" height="48" fill="white" fill-opacity="0.01"/>
                <path d="M42 19H5.99998" stroke="#333" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"/>
                <path d="M30 7L42 19" stroke="#333" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"/>
                <path d="M6.79897 29H42.799" stroke="#333" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"/>
                <path d="M6.79895 29L18.799 41" stroke="#333" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"/>
            </svg>
        </div>
        
    </div>
    <div class="picker-color-predefine">
        <div class="picker-color-title" 
            v-for="(item,index) in titleColorDefault" 
            :key="index" 
            :style="{background: item}"
            @click="changePredeine(item)"
        />
    </div>
    <div class="picker-color-predefine-box">
        <div class="picker-color-box" 
            v-for="(item,index) in colorPredefine" 
            :key="index" 
            :style="{background: item}"
            @click="changePredeine(item)"
        />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref,computed,watch,onMounted,toRef } from 'vue'
import { pickerColorHsvRgba } from "../../types/shape"
import { rgbtohsv,hsvtorgb,colorToRgba,rgbaTocolor } from '../../until/index'  
import usePickerSvpanel from './hooks/usePickerSvpanel'
import useColorBar from './hooks/useColorBar'
import useColorSlider from './hooks/useColorSlider'
export default defineComponent({
  name: 'color-picker', 
  props:{
      color: {
          type: String,
          required: true,
      }
  },
  setup(props,{ emit }) {
      const pickerColorHsv = ref<pickerColorHsvRgba>({
          h:0,
          s:0,
          v:100,
          a:1
      })
      const titleColorDefault = ref(["#ff3b30","#ff9500","#ffcc00","#4cd964","#5ac8fa","#007aff","#5856d6","#bd10e0"])
      const colorPredefine = ref([
          "#ffd8d6","#ffeacc","#fff5cc","#dbf7e0","#def4fe","#cce4ff","#deddf7","#f2cff9",
          "#ffb1ac","#ffd599","#ffeb99","#bff1c7","#bde9fd","#99caff","#bcbbef","#e59ff3",
          "#ff766f","#ffb54d","#ffdb4d","#82e493","#8cd9fc","#4da2ff","#8a89e2","#d158e9",
          "#b22922","#b26800","#b28e00","#359746","#3f8caf","#0055b2","#3d3c95","#840b9c",
          "#661813","#663c00","#665200","#1e5728","#245064","#003166","#232256","#4c065a"
      ])
      const hsv = ref([0])
      const isRgbMode = ref(true)
      
      /**
       * 背景颜色
       */
      const pickerColorSvpanelBg = computed(() => {
          let pickerColorBg = hsvtorgb(pickerColorHsv.value.h,100,100)
          return `rgb(${pickerColorBg[0]},${pickerColorBg[1]},${pickerColorBg[2]})`
      })
      /**
       * 吸附的颜色(rgba模式)
       */
      const adsorbentColor = computed(() => {
          let pickerColorAdsorbent = hsvtorgb(pickerColorHsv.value.h,pickerColorHsv.value.s,pickerColorHsv.value.v)
          let rgba = `rgba(${pickerColorAdsorbent[0]},${pickerColorAdsorbent[1]},${pickerColorAdsorbent[2]},${pickerColorHsv.value.a})`
          emit("changePickerColorBen",isRgbMode.value ? rgba : rgbaTocolor(rgba))
          return rgba
      })
      /**
       * 吸附的颜色(16进制模式)
       */
      const colorMode = computed(() => {
          let pickerColorAdsorbent = hsvtorgb(pickerColorHsv.value.h,pickerColorHsv.value.s,pickerColorHsv.value.v)
          let rgba = `rgba(${pickerColorAdsorbent[0]},${pickerColorAdsorbent[1]},${pickerColorAdsorbent[2]},${pickerColorHsv.value.a})`
          return rgbaTocolor(rgba)
      })
      
      const changePredeine = (value:string) => { 
          if(/rgba\(.*\)$/g.test(value)){
              let rgbaArr = value.replace(/rgba?\(/, '').replace(/\)/, '').replace(/[\s+]/g, '').split(',')
              if(rgbaArr.length && rgbaArr.length == 4) {
                  pickerColorHsv.value.a = Number(rgbaArr[3])
                  value = `rgba(${rgbaArr[0]},${rgbaArr[1]},${rgbaArr[2]})` 
              }
              value = rgbaTocolor(value)
          }
          if(!value) return
          let rgb:number[] | undefined = colorToRgba(value)
          if(rgb && rgb.length) {
            hsv.value = rgbtohsv(rgb[0],rgb[1],rgb[2])
            pickerColorHsv.value.h = hsv.value[0]
            pickerColorHsv.value.s = hsv.value[1]
            pickerColorHsv.value.v = hsv.value[2]
            hsv.value[3] = pickerColorHsv.value.a
          }
      }

      const changeColorMode = () => {
          isRgbMode.value = !isRgbMode.value
      }
 
      onMounted(() => {
         changePredeine(props.color)
      }) 
      
      const changePickerColor = (value:pickerColorHsvRgba) => {
          pickerColorHsv.value.h = value.h
          pickerColorHsv.value.s = value.s
          pickerColorHsv.value.v = value.v
          pickerColorHsv.value.a = value.a
      }

     const hsvC = computed(() => hsv.value)
     const pickerSvpanel = usePickerSvpanel(pickerColorHsv.value,hsvC)
     const colorBar = useColorBar(pickerColorHsv.value,hsvC)
     const colorSlider = useColorSlider(pickerColorHsv.value,hsvC)

      return {
          pickerColorSvpanelBg,
          adsorbentColor,
          pickerColorHsv,
          changePickerColor,
          titleColorDefault,
          colorPredefine,
          changePredeine,
          hsv,
          colorMode,
          isRgbMode,
          changeColorMode,
          ...pickerSvpanel,
          ...colorBar,
          ...colorSlider
      }
  }
})

</script>
<style lang="scss" scoped>
    .color-picker{
        position: relative;
        width: 240px;
        background: #fff;
        user-select: none;
        z-index: 9999;
        border: 1px solid #eee;
        padding: 10px;
        box-sizing: content-box;
        .picker-color-bar{
            display: flex;
            .color-content{
                width: 24px;
                height: 26px;
                position: relative;
                margin-top: 4px;
                margin-right: 4px;
                outline: 1px dashed hsla(0,0%,40%,.12);
                background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==);
                .picker-current-color{
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    z-index: 2;
                }
            }
            .color-slider{
                padding: 4px 0;
                flex: 1;
                .picker-color-barWraper{
                    position: relative;
                    height: 10px;
                }
            }
        }
        .picker-color-dropdown__btns{
            width: 100%;
            height: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: 1px solid #eee;
            .picker-color-mode{
                margin-left: 20px;
                display: flex;
                align-items: center;
                cursor: pointer;
            }
        }
        .picker-color-predefine-box,
        .picker-color-predefine{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-top: 8px;
            .picker-color-box,
            .picker-color-title{
                width: 20px;
                height: 20px;
                border-radius: 2px;
                cursor: pointer;
            }
            .picker-color-box{
                margin-right: 10px;
                margin-bottom: 5px;
            }
            &>div:nth-child(8n){
                 margin-right: 0; 
            }
        }
    }

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