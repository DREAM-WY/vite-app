<template>
	<div class="todo-footer">
		<span>已选择0条</span>
		<button class="todo-footer-btn">清除选择</button>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	name: 'Footer',
	setup() {
		return {}
	},
})
</script>
<style lang="scss" scoped>
.todo-footer {
	display: flex;
	justify-content: space-between;
	font-size: 16px;
	&-btn {
		padding: 6px 8px;
	}
}
</style>
