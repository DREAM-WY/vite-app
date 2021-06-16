import request from '@/utils/request'
export function getConfig(data: any) {
	return request({
		url: '/api-cen/api/wechat/getConfig',
		method: 'post',
		data,
	})
}
export function getWeChatUrl(data: any) {
	return request({
		url: '/api-cen/api/wechat/getWeChatUrl',
		method: 'post',
		data,
		headers: {
			Authorization: null,
		},
	})
}
export function refreshLogin(data: any) {
	return request({
		url: '/sys/refresh_token',
		method: 'post',
		data,
	})
}

// 通过code获取token
export function getWechatLogin(data: any) {
	return request({
		url: '/sys/wechat/login',
		method: 'post',
		data,
	})
}
// 刷新token
export function getRefreshToken(data: any) {
	return request({
		url: '/sys/refresh_token',
		method: 'post',
		data,
	})
}
// 获取微信配置
export function getWXConfig(data: any) {
	return request({
		url: '/api-cen/api/wechat/getConfig',
		method: 'post',
		data,
		headers: {
			Authorization: null,
		},
	})
}
// saas图片上传
export function uploadSaas(data: any) {
	return request({
		url: '/api-f/fast/files/save',
		method: 'post',
		data,
	})
}
