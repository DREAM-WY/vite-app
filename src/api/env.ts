/**
 * 配置编译环境和线上环境之间的切换
 *
 */
const Config = {
	baseUrl: '', // 接口url
	imgBaseUrl: '', // 图片url
	mallUrl: 'http://mall.sz.energy.js.cn', // 商城地址
	portalUrl: 'http://portal.sz.energy.js.cn', // 公共服务地址
	erpTask: '', // erp待办工单跳转链接
}
const hostname = window.location.hostname
const getCurrentEnvUrl = function (path?: any) {
	let prefix
	const environment = (window as any).NODE_ENV
	switch (environment) {
		case 'sit':
			// prefix = `http://a.fehorizon.com/HXJFwpsTEST`;
			prefix = (window as any).APIBASEURL
			Config.erpTask = 'https://wxtest.hongxinshop.com/HxEpwechat/hxapp/#/workitems/Queue/ERP?from=MP' // erp待办工单跳转链接
			Config.erpTask = 'http://sit-a.hongxinshop.com/HxEpwechat/hxapp/#/workitems/Queue/ERP?from=MP' // erp待办工单跳转链接
			break
		case 'uat':
			prefix = (window as any).APIBASEURL
			Config.erpTask = 'http://sit-a.hongxinshop.com/HxEpwechat/hxapp/#/workitems/Queue/ERP?from=MP' // erp待办工单跳转链接
			break
		case 'production':
			// prefix = `http://hxjf.fehorizon.com`;
			prefix = (window as any).APIBASEURL
			// Config.erpTask =
			// "http://a.fehorizon.com/HXEwechat/hxapp/index.html#/workitems/Queue/ERP?from=MP"; //erp待办工单跳转链接
			Config.erpTask = 'http://a.hongxinshop.com/HXEwechat/hxapp/index.html#/workitems/Queue/ERP?from=MP' // erp待办工单跳转链接
			break
		case 'local':
			// prefix = `http://172.24.121.201:8080`; //开发
			prefix = 'http://172.16.85.112:8080' //
			prefix = '/myApi' //
			break
		default:
			prefix = (window as any).APIBASEURL // 测试
			break
	}
	const aim = path && environment === 'development' ? eval(path) : prefix
	return aim
}

Config.baseUrl = `${getCurrentEnvUrl()}`
// Config.baseUrlMeeting = 'http://114.67.104.46:3000/mock/119/'

export { Config }
