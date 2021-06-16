<template>
	<li class="todo-item">
		<input class="todo-item-input" name="Fruit" type="checkbox" v-model="todo.isChecked" />
		<span class="todo-item-title">{{ todo.name }}</span>
		<button @click="delTodoList(index)" class="todo-item-btn">删除</button>
	</li>
</template>
<script lang="ts">
import { defineComponent, inject } from 'vue'
export default defineComponent({
	name: 'item',
	props: ['todo', 'index'],
	setup() {
		const delTodoList = inject('delTodoList')
		return { delTodoList }
	},
})
</script>
<style lang="scss" scoped>
.todo-item {
	padding: 10px;
	font-size: 14px;
	height: 28px;
	line-height: 28px;
	&-input {
		vertical-align: middle;
	}
	&-title {
		display: inline-block;
		margin-left: 10px;
	}
	&-btn {
		float: right;
		padding: 6px 8px;
	}
}
</style>
