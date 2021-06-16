import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		component: () => import('/@/views/list/index.vue'),
	},
	{
		path: '/list',
		component: () => import(/* webpackChunkName: "chatpage" */ '/@/views/list/index.vue'),
		name: '列表',
	},
	{
		path: '/detail',
		component: () => import(/* webpackChunkName: "chatpage" */ '/@/views/detail/index.vue'),
		name: '列表',
	},
	{
		path: '/todoList',
		component: () => import(/* webpackChunkName: "chatpage" */ '/@/views/todoList/index.vue'),
		name: '列表',
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router
