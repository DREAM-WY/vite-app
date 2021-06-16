<template>
	<div class="todo-wrap">
		<Header @addTodoList="addTodoList" />
		<Content :todoList="todoList" />
		<Footer />
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive, provide } from 'vue'
import { Todo } from './index.d'
import Header from './header.vue'
import Footer from './footer.vue'
import Content from './content.vue'

export default defineComponent({
	name: 'index',
	components: {
		Header,
		Footer,
		Content,
	},
	setup() {
		const todoList: Array<Todo> = reactive([
			{
				name: '奥迪',
				isChecked: false,
			},
			{
				name: '宝马',
				isChecked: true,
			},
			{
				name: '奔驰',
				isChecked: false,
			},
		])
		// 添加方法
		const addTodoList = (todo: Todo): void => {
			todoList.unshift(todo)
		}
		// 删除方法
		const delTodoList = (index: number): void => {
			todoList.splice(index, 1)
			console.log(todoList)
		}
		// 删除方法注入进组件方便后面去拿
		provide('delTodoList', delTodoList)

		return {
			todoList,
			addTodoList,
			delTodoList,
		}
	},
})
</script>
<style lang="scss" scoped>
.todo-wrap {
	width: 400px;
	height: 400px;
	margin: auto;
	display: flex;
	flex: 1;
	flex-direction: column;

	padding: 20px;
	justify-content: space-between;
}
</style>
