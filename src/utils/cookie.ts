/**
 * cookie操作
 * 增 删 获取
 */

const setCookie = (name: string, value: string, expiresHours: number) => {
	let cookieString = name + '=' + escape(value)
	// 判断是否设置过期时间
	if (expiresHours > 0) {
		// debugger;
		const date = new Date()
		date.setTime(date.getTime() + expiresHours * 60 * 1000)
		cookieString = cookieString + '; expires=' + date.toUTCString()
	}
	document.cookie = cookieString
}

const getCookie = (name: string): string | null => {
	const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
	const arr = document.cookie.match(reg)
	if (arr) {
		return decodeURIComponent(arr[2])
	} else {
		return null
	}
}

const delCookie = ({ name }: any) => {
	if (getCookie(name)) {
		setCookie(name, '', 0)
	}
}

export { setCookie, getCookie, delCookie }
