<template>
	<ul class="todo-content-ul">
		<Item v-for="(item, index) in todoList" :key="index" :todo="item" :index="index" />
	</ul>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import Item from './item.vue'

export default defineComponent({
	name: 'content',
	components: {
		Item,
	},
	props: ['todoList'],
	setup(props) {
		console.log(props.todoList, '	console.log(todoList)	console.log(todoList)')
		return {}
	},
})
</script>
<style lang="scss" scoped>
.todo-content-ul {
	flex-grow: 1;
	padding: 10px 0;
}
</style>
