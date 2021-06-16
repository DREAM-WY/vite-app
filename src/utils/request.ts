import axios from 'axios'
// import router from '../router/index'
import { Toast } from 'vant'
import { getToken } from '@/utils/auth'
import { getBaseUrl } from '@/utils/env'
import { getCookie, setCookie, delCookie } from '@/utils/cookie'
import getData from '@/api/getData'
// 创建axios实例
const service = axios.create({
	baseURL: getBaseUrl(),
	timeout: 30 * 1000, // 请求超时
})
let isRefreshing = false
let requests: any[] = []
// request拦截器
service.interceptors.request.use(
	config => {
		// do something before request is sent
		// let each request carry token
		// ['X-Token'] is a custom headers key
		// please modify it according to the actual situation
		config.headers.Authorization = 'Bearer ' + getToken()
		return config
	},
	error => {
		// do something with request error
		console.log(error) // for debug
		return Promise.reject(error)
	}
)

// response 拦截器
service.interceptors.response.use(
	response => {
		const { hideToast } = response.config.headers
		const responseCode = response.data.code
		// 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
		// 否则的话抛出错误
		if (responseCode === 200) {
			return Promise.resolve(response.data)
		} else {
			// setTimeout(() => {
			//   Toast(response.data.msg)
			// }, 300);
			if (!hideToast) {
				setTimeout(() => {
					Toast(response.data.msg)
				}, 300)
			}
			return Promise.reject(response.data)
		}
		// return response.data
	},
	error => {
		if (error && error.response) {
			const { status } = error.response
			if (status === 401 && (window as any).NODE_ENV === 'production') {
				if ((window as any).isApp) {
					const toast = Toast.loading({
						message: '用户信息已过期，重新获取中...',
						duration: 0, // 持续展示 toast
						forbidClick: true,
					})
					;(window as any).hx.ready(function () {
						;(window as any).hx.refreshToken({
							success: () => {
								window.location.reload()
							},
							fail: (err: any) => {
								Toast('获取用户信息失败,请刷新当前页面')
							},
						})
					})
					return
				} else {
					// if (status === 401) {
					const config = error.response.config
					if (!isRefreshing) {
						isRefreshing = true
						const refresh_token = getCookie('refresh_token')
						if (!refresh_token) {
							isRefreshing = false
							return
						}
						return getData
							.refreshLogin({
								method: 'post',
								headers: { hideToast: true },
								data: {
									refreshToken: refresh_token,
								},
							})
							.then((res: any) => {
								const { access_token, refresh_token, username } = res.data
								// const access_token = '4a00f579-626f-4c4e-9d24-02b5e00ffdf5'
								setCookie('access_token', access_token, 24 * 7)
								// instance.setToken(access_token,12)
								setCookie('refresh_token', refresh_token, 24 * 30)
								setCookie('accountName', username, 24 * 7)

								config.headers.Authorization = `Bearer ${access_token}`
								config.baseURL = ''
								// 已经刷新了token，将所有队列中的请求进行重试
								requests.forEach(cb => cb(access_token))
								requests = []
								return service(config)
							})
							.catch((res: any) => {
								console.error('refreshtoken error =>', res)
								// const loginUrl=process.env.NODE_ENV === 'production'?'http://hxjf.fehorizon.com/#/login':'http://a.fehorizon.com/HXJFwpsTEST/#/login'
								// window.location.href = loginUrl
								// router.push('/login')
								getData
									.getWeChatUrl({
										method: 'post',
										data: {
											redirectUri: window.location.href,
										},
										headers: {
											Authorization: null,
											hideToast: true,
										},
									})
									.then((res: any) => {
										if (res?.code == 200) {
											const { weChatUri } = res.data
											// window.location.href = weChatUri
											delCookie({ name: 'access_token' })
											delCookie({ name: 'refresh_token' })
											delCookie({ name: 'accountName' })
											setTimeout(() => {
												window.location.href = weChatUri
											}, 1000)
										}
									})
									.catch((error: any) => {
										Toast({
											message: error.msg,
											forbidClick: true,
											onClose: function () {
												// router.push('/error')
											},
										})
									})
							})
							.finally(() => {
								isRefreshing = false
							})
					} else {
						// 正在刷新token，将返回一个未执行resolve的promise
						return new Promise(resolve => {
							// 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
							requests.push((access_token: any) => {
								config.baseURL = ''
								config.headers.Authorization = `Bearer ${access_token}`
								resolve(service(config))
							})
						})
					}
				}
			} else {
				switch (error.response.status) {
					case 400:
						error.message = '请求错误(400)'
						break
					case 403:
						error.message = '拒绝访问(403)'
						break
					case 404:
						error.message = '请求出错(404)'
						break
					case 408:
						error.message = '请求超时(408)'
						break
					case 500:
						error.message = '服务器错误(500)'
						break
					case 501:
						error.message = '服务未实现(501)'
						break
					case 502:
						error.message = '网络错误(502)'
						break
					case 503:
						error.message = '服务不可用(503)'
						break
					case 504:
						error.message = '网络超时(504)'
						break
					case 505:
						error.message = 'HTTP版本不受支持(505)'
						break
					default:
						error.message = `连接出错(${error.response.status})!`
				}
				Toast(error.message)
			}
		} else {
			// 请求超时状态
			if (error.message.includes('timeout')) {
				Toast('请求超时，请检查网络是否连接正常')
				error.message = '请求超时，请检查网络是否连接正常'
			} else {
				// 可以展示断网组件
				// Toast('请求失败，请检查网络是否已连接')
				error.message = '请求失败，请检查网络是否已连接'
			}
		}

		return Promise.reject(error)
	}
)

export default service
