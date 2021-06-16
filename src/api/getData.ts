import { Config } from './env'
// import fetch from "./fetch";
import fetch from '@/utils/request'
// import jsdApi from './jds'

const getData = {
	/** 首页**/
	// 登录
	login(params: any) {
		params.url = '/sys/login'
		params.baseURL = Config.baseUrl
		return fetch(params)
	},
	// 登出
	logout(params: any) {
		params.url = '/sys/logout'
		params.baseURL = Config.baseUrl
		return fetch(params)
	},
	// 微信登录
	wechatLogin(params: any) {
		params.url = '/sys/wechat/login'
		params.baseURL = Config.baseUrl
		return fetch(params)
	},
	// 获取微信拼接code地址
	getWeChatUrl(params: any) {
		params.url = '/api-cen/api/wechat/getWeChatUrl'
		return fetch(params)
	},
	// 刷新登录
	refreshLogin(params: any) {
		params.url = '/sys/refresh_token'
		return fetch(params)
	},
	// 获取企业微信信息
	getConfig(data: any) {
		data.url = '/api-cen/api/wechat/getConfig'
		return fetch(data)
	},
}
// Object.assign(getData, jsdApi);
export default getData
