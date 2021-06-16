<template>
	<div class="list-data" v-for="(item, index) in listData" :key="index">
		<div class="list-data-cell">
			<span class="list-data-cell-title">单据编号:</span>
			<span class="list-data-cell-content">GP988GP98383838GP98GP988GP98383838GP98GP988GP98383838GP98</span>
			<van-tag class="list-data-cell-tag" type="primary" plain color="#4B8BF7">已绑定</van-tag>
		</div>
		<div class="list-data-cell">
			<span class="list-data-cell-title">供 应 商:</span>
			<span class="list-data-cell-content"></span>
		</div>
		<div class="list-data-cell">
			<span class="list-data-cell-title">采购数量:</span>
			<span class="list-data-cell-content"></span>
		</div>
	</div>
</template>
<script lang="ts">
import { inject, defineComponent } from 'vue'
import { ListData } from './index.d'
export default defineComponent({
	name: 'cell',
	setup() {
		const listData: Array<ListData> = inject('listData') || []
		return {
			listData,
		}
	},
})
</script>
<style lang="scss" scoped>
.list-data {
	box-sizing: border-box;
	height: 87px;
	margin: 10px 10px 0;
	padding: 10px;
	background-color: #fff;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.04);
	border-radius: 6px;
	&-cell {
		position: relative;
		overflow: hidden;
		vertical-align: middle;
		&-title {
			float: left;
			width: 60px;
			text-align: right;
			font-size: 12px;
			color: #999999;
		}
		&-content {
			float: left;
			width: calc(100% - 115px);
			padding-left: 10px;
			font-size: 12px;
			color: #333;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		&-tag {
			position: absolute;
			top: 0px;
		}
	}
}
</style>
