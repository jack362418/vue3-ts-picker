 
/**
 * 
 * rgb转化为hsv
 */
export const rgbtohsv = (r:number,g:number,b:number) => {
	r = r / 255
	g = g / 255
	b = b / 255
	let h = 0
	let s = 0
	let v = 0
	const min = Math.min(r,g,b)
	const max = v = Math.max(r,g,b)
	const difference = max - min
	if( max == min ){
		h = 0 
	}else{
		switch(max){
			case r: h=(g-b)/difference+(g < b ? 6 : 0);break;
			case g: h=2.0+(b-r)/difference;break;
			case b: h=4.0+(r-g)/difference;break;
		}
		h=Math.round(h*60);
	}
	if(max==0){
		s=0;
	}else{
		s=1-min/max;
	}
	s = Math.round(s*100)
	v = Math.round(v*100)
	return [h,s,v]
}

/**
 * hsv转化为rgb
 */
export const hsvtorgb = (h:number,s1:number,v1:number):number[] => {
	const s = s1 / 100
	const v = v1 / 100
	const h1 = Math.floor(h / 60) % 6
	const f = h / 60 - h1
	const p = v * (1 - s)
	const q = v * (1 - f * s)
	const t = v * (1 - (1 - f) * s)
	let r = 0
	let g = 0
	let b = 0
	switch (h1) {
		case 0: r = v; g = t; b = p; break;
		case 1: r = q; g = v; b = p; break;
		case 2: r = p; g = v; b = t; break;
		case 3: r = p; g = q; b = v; break;
		case 4: r = t; g = p; b = v; break;
		case 5: r = v; g = p; b = q; break;
	}
	return [Math.round(r * 255),Math.round(g * 255),Math.round(b * 255)]
}

/**
 * 16进制颜色值转化为rgb
 */
export const colorToRgba = (sHex:string,alpha = 1) => {
	const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
	let sColor = sHex.toLowerCase()
	if(sColor && reg.test(sColor)) {
		if(sColor.length === 4) {
			let sColorNew = '#'
			for(let i = 1; i < 4; i += 1) {
				sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1))
			}
			sColor = sColorNew
		}
		const sColorChange = []
		for(let i = 1; i < 7; i += 2) {
			sColorChange.push(parseInt('0x' + sColor.slice(i,i + 2)))
		}
		return sColorChange
	}else {
		return []
	}
}

/**
 * rgba转化为16进制
 */
export const rgbaTocolor = (color:string) => {
	const values:Array<any> = color.replace(/rgba?\(/, '').replace(/\)/, '').replace(/[\s+]/g, '').split(',')
	const a = parseFloat(values[3] || 1)
	const r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255)
    const g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255)
    const b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255)
	return '#' +
    ('0' + r.toString(16)).slice(-2) +
    ('0' + g.toString(16)).slice(-2) +
    ('0' + b.toString(16)).slice(-2)
}