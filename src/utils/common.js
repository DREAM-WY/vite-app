import wx from 'weixin-js-sdk'
import Vue from 'vue'
import { wechatConfig } from '@/api/common'
import { Toast } from 'vant'
import { getDeny, getLocationLat } from '@/utils/location'
const initAuthorize = false
Vue.use(Toast)
export function isPc(source) {
	if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
		return false
	} else {
		return true
	}
}
export function getWxcofig() {
	return new Promise((resolve, reject) => {
		if (window.isApp) {
			resolve(true)
			return
		}
		const url = window.location.href.split('#')[0]
		wechatConfig({
			url,
		}).then(res => {
			const data = res.data
			wx.config({
				beta: true,
				debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: data.appId, // 必填，公众号的唯一标识
				timestamp: data.timestamp, // 必填，生成签名的时间戳
				nonceStr: data.nonceStr, // 必填，生成签名的随机串
				signature: data.signature, // 必填，签名
				jsApiList: ['checkJsApi', 'scanQRCode', 'getLocation', 'chooseImage', 'uploadImage'], // 必填，需要使用的JS接口列表
			})
			wx.ready(function () {
				console.log('微信配置成功')
				resolve(true)
			})
		})
	})
}
export function checkJsApi(api) {
	// 检测api是否可用
	return new Promise((resolve, reject) => {
		if (window.isApp) {
			resolve(true)
			return
		}
		wx.checkJsApi({
			jsApiList: [api], // 需要检测的JS接口列表，所有JS接口列表见附录2,
			success: function (res) {
				// 以键值对的形式返回，可用的api值true，不可用为false
				if (res.checkResult && res.checkResult.chooseImage === false) {
					Toast('微信版本较低，请升级后重试！')
					reject('版本低')
				} else {
					resolve(true)
				}
			},
		})
	})
}

export function getEnvOld() {
	let env = ''
	switch (window.location.hostname) {
		case 'mit-hxjf.hongxinshop.com': // 开发环境
			env = 'mit'
			break
		case 'sit-hxjf.hongxinshop.com': // 测试环境
			env = 'sit'
			break
		case 'hxjf.hongxinshop.com': // 线上环境
			env = 'pro'
			break
		case 'uat-hxjf.hongxinshop.com': // uat
			env = 'uat'
			break
		default:
			// 本地环境
			env = 'local'
			break
	}
	return env
}
//是否ios
export function appSource() {
	const u = navigator.userAgent
	const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
	if (isiOS) {
		return 'ios'
	} else {
		return 'andriod'
	}
}
//app打开文件
export function openfileInapp({ name, url }) {
	console.log(name, url)
	hx.ready(() => {
		hx.previewFile({
			name, //需要预览文件的地址
			url,
		})
	})
}

//返回文件路径
export function getFileurl() {
	const sur = getEnvOld()
	let host = ''
	switch (sur) {
		case 'sit':
			host = 'https://sit-hxjf.hongxinshop.com/image/'
			break
		case 'uat':
			host = 'https://uat-hxjf.hongxinshop.com/image/'
			break
		case 'pro':
			host = 'https://hxjf.hongxinshop.com/image/'
			break
		default:
			host = 'https://mit-hxjf.hongxinshop.com/image/'
			break
	}
	return host
}
export function getWxClient() {
	let wxenv = ''
	const ua = navigator.userAgent.toLowerCase()
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		if (ua.match(/wxwork/i) == 'wxwork') {
			wxenv = 'wxwork'
		} else {
			wxenv = 'wx'
		}
	} else {
		wxenv = 'other'
	}
	return wxenv
}

export function currentPosition() {
	return new Promise(resolve => {
		let posLongitude = '121.470431'
		let posDimension = '31.172371'
		if (isPc()) {
			const res = {
				posLongitude,
				posDimension,
			}
			resolve(res)
		} else {
			console.log('ismobile')
			getWxcofig().then(res => {
				if (res) {
					console.log('mobile授权')
					getDeny({
						complete: response => {
							const { initAuthorize } = response
							if (initAuthorize) {
								getLocationLat({
									timeout: 10000,
									toast: {
										show: false,
										startText: '获取当前位置中...',
										endText: '网络异常，定位失败，无法获取定位数据',
									},
									success: result => {
										const { lat, lng } = result
										posDimension = lat
										posLongitude = lng
										const res = {
											posLongitude,
											posDimension,
										}
										resolve(res)
										console.log('result', result)
									},
								})
							}
						},
					})
				}
			})
		}
	})
}
