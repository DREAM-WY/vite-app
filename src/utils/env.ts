/**
 * 根据域名，获取本应用的发布版本
 * sit-hxjf.hongxinshop.com
 * mit-hxjf.hongxinshop.com
 * hxjf.hongxinshop.com
 **/
declare global {
	interface Window {
		NODE_ENV: string
		isApp: boolean
	}
}

const getEnv = (mark: string = 'hxjf'): string => {
	/* eslint-disable */
	const tag = window.location.hostname.match(eval(`/.*(?=${mark})/`))
	return !tag ? 'local' : tag[0] ? tag[0].replace('-', '') : 'production'
}

/**
 * 根据域名，获取本应用的发布版本
 * http://a.fehorizon.com/HXJFwpsTEST/wps-vue#/punch
 * http://172.24.121.201:82/HXJFwpsDEV/#/
 * hxjf.hongxinshop.com
 **/
// 注册到全局
window.NODE_ENV = getEnv()

// 等域名统一后再使用此方法
export const getBaseUrl = (env: string = 'sit'): string => {
	return window.NODE_ENV === 'local' ? `/${env}-api` : '/vue-api'
}

// 为了兼容旧域名，先使用
export const getBaseUrlOld = (env: string = 'mit'): string => {
	const aim: string = `${window.NODE_ENV === 'sit' ? '/HXJFwpsTEST' : '/vue-api'}`
	return window.NODE_ENV === 'local' ? `/${env}-api` : aim
}
