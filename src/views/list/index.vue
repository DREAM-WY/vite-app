<template>
	<div class="list-wrap">
		<van-search class="list-search" left-icon="search" v-model="search" placeholder="请输入单据编号"></van-search>

		<van-tabs class="list-tabs" v-model:active="activeName" color="#367EF5" :line-width="51" :line-height="4">
			<van-tab :title="'全部(' + count + ')'" name="ALL"></van-tab>
			<van-tab :title="'待绑定(' + count + ')'" name="NO"></van-tab>
			<van-tab :title="'已绑定(' + count + ')'" name="YES"></van-tab>
		</van-tabs>

		<van-pull-refresh class="list-refresh" v-model="refresh" @refresh="onRefresh">
			<van-list class="list-list" v-model:loading="isLoading" :finished="finished" finished-text="我也是有底线的" @load="onLoad">
				<ListCell></ListCell>
			</van-list>
		</van-pull-refresh>
	</div>
</template>
<script lang="ts">
import { ref, reactive, onMounted, provide, defineComponent, Ref } from 'vue'
import { Search, Tab, Tabs, List, PullRefresh, Tag } from 'vant'
import ListCell from './cell.vue'
import { ListData, STAGS } from './index.d'
// 状态的枚举

export default defineComponent({
	name: 'list',

	setup() {
		let count: Ref<number> = ref(0)
		let search: Ref<string> = ref('') // 搜索
		let activeName: Ref<STAGS> = ref(STAGS.ALL) // tag页签
		let refresh: Ref<boolean> = ref(false)
		let isLoading: Ref<boolean> = ref(false)
		let finished: Ref<boolean> = ref(false)
		let listData: Array<ListData> = reactive([{ name: 1 }, { name: 2 }])
		const onLoad = (): void => {
			isLoading.value = false
		}
		const onRefresh = (): void => {
			setTimeout(() => {
				refresh.value = false
			}, 1000)
		}
		provide('listData', listData) // 把数据注入到组件中去,方便子组件拿
		return {
			search,
			count,
			isLoading,
			finished,
			listData,
			refresh,
			onLoad,
			onRefresh,
			activeName,
		}
	},
})
</script>
<style lang="scss" scoped>
.list-wrap {
	width: 100%;
	height: 100%;
	background-color: #fafafa;
	overflow: hidden;
	.list-search {
		padding: 10px 19px;
		margin-bottom: 1px;
		border-radius: 4px;
		background-color: #fff;
		box-shadow: 0px 1px 2px 0px #f2f2f2;
	}
	.list-tabs {
		height: 46px;
		box-shadow: 0px 1px 2px 0px #f2f2f2;
	}
	.list-refresh {
		height: calc(100% - 110px);
		.list-list {
			overflow-y: auto;
		}
	}
}
</style>
