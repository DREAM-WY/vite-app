<template>
	<input class="todo-input" placeholder="请输入" type="text" v-model="keyword" @keyup.enter="onClick" />
</template>
<script lang="ts">
import { defineComponent, inject, Ref, ref } from 'vue'
import { Todo } from './index.d'
export default defineComponent({
	name: 'Header',
	emits: ['addTodoList'],
	setup(props, { emit }) {
		const keyword: Ref<string> = ref('')
		const onClick = (): void => {
			const todo: Todo = {
				name: keyword.value,
				isChecked: false,
			}
			emit('addTodoList', todo)
			keyword.value = ''
		}
		return {
			keyword,
			onClick,
		}
	},
})
</script>
<style lang="scss" scoped>
.todo-input {
	width: 400px;
	height: 28px;
}
</style>
