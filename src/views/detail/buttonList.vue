<template>
	<div class="detail-button">
		<van-button v-if="showButton('previous')" class="detail-button-previous">上一页</van-button>
		<van-button v-if="showButton('previous-next')" class="detail-button-next" type="primary">下一页</van-button>
		<van-button v-if="showButton('previous-submit')" class="detail-button-next" type="primary">提 交</van-button>
		<van-button v-if="showButton('next')" block type="primary">下一页</van-button>
		<van-button v-if="showButton('submit')" type="primary" block>提 交</van-button>
	</div>
</template>

<script lang="ts">
import { defineComponent, inject, Ref, ref } from 'vue'
export default defineComponent({
	setup() {
		const total: Ref<number> = inject('total') || ref(0)
		const pageSize: Ref<number> = inject('pageSize') || ref(0)
		const showButton = (flag: string): boolean => {
			switch (flag) {
				case 'previous':
					return total.value > 10 && pageSize.value > 1
				case 'previous-next':
					return pageSize.value * 10 < total.value && pageSize.value > 1
				case 'previous-submit':
					return pageSize.value * 10 > total.value && pageSize.value > 1
				case 'next':
					return total.value > 10 && pageSize.value === 1
				case 'submit':
					return total.value <= 10
				default:
					return false
			}
		}
		return {
			showButton,
		}
	},
})
</script>

<style lang="scss" scoped>
.detail-button {
	width: 100%;
	position: absolute;
	bottom: 0;
	&-previous {
		width: 40%;
	}
	&-next {
		width: 60%;
	}
}
</style>
