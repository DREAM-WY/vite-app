<template>
	<div class="detail-wrap">
		<div class="detail-wrap-content">
			<div class="detail-base">
				<div class="detail-title">基础信息</div>
				<div class="detail-base-content">
					<van-cell title="单据编号" value="CG2020042500001" />
					<van-cell title="供应商" value="浙江鼎力机械股份有限公司" />
					<van-cell border title="采购数量" value="0" />
				</div>
			</div>
			<div class="detail-binding">
				<div class="detail-title">绑定明细 (<span class="detail-binding-success">42</span><span class="detail-binding-total">/45</span>)</div>
				<van-collapse v-model="activeNames" :border="false" @change="cellChange">
					<van-collapse-item class="detail-binding-cell" title="标题1" name="1" :border="false">
						<div class="binding-detail">
							<van-checkbox-group class="binding-detail-check" icon-size="16px" v-model="checked" direction="horizontal">
								<van-checkbox name="a">绑定GPS二维码</van-checkbox>
								<van-checkbox name="b">绑定铭牌二维码</van-checkbox>
							</van-checkbox-group>
							<van-form class="binding-detail-form">
								<van-field name="厂家型号编码" label="厂家型号编码" />
								<van-field name="设备编号" label="设备编号" />
								<van-field name="主机编号" label="主机编号" />
								<van-field name="铭牌编号" label="铭牌编号" />
								<van-field name="发动机编号" label="发动机编号" />
								<van-field name="铭牌二维码" label="铭牌二维码" right-icon="scan" />
								<van-field name="GPS二维码" label="GPS二维码" right-icon="scan" />
								<p class="binding-detail-form-prompt"><span></span>请上传与必填字段相关联的图片</p>
							</van-form>
						</div>
					</van-collapse-item>
					<van-collapse-item class="detail-binding-cell unfinished" title="标题2" name="2" :border="false">
						<div class="binding-detail">
							<van-checkbox-group class="binding-detail-check" icon-size="16px" v-model="checked" direction="horizontal">
								<van-checkbox name="a">绑定GPS二维码</van-checkbox>
								<van-checkbox name="b">绑定铭牌二维码</van-checkbox>
							</van-checkbox-group>
							<van-form class="binding-detail-form">
								<van-field name="厂家型号编码" label="厂家型号编码" />
								<van-field name="设备编号" label="设备编号" />
								<van-field name="主机编号" label="主机编号" />
								<van-field name="铭牌编号" label="铭牌编号" />
								<van-field name="发动机编号" label="发动机编号" />
								<van-field name="铭牌二维码" label="铭牌二维码" right-icon="scan" />
								<van-field name="GPS二维码" label="GPS二维码" right-icon="scan" />
								<p class="binding-detail-form-prompt"><span></span>请上传与必填字段相关联的图片</p>
							</van-form>
						</div>
					</van-collapse-item>
					<van-collapse-item class="detail-binding-cell" title="标题3" name="3" :border="false">内容</van-collapse-item>
					<van-collapse-item class="detail-binding-cell" title="标题4" name="4" :border="false">内容</van-collapse-item>
				</van-collapse>
			</div>
		</div>
		<buttonList />
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, reactive, provide } from 'vue'
import { Form, Button, Cell, Collapse, CollapseItem, Icon, Checkbox, CheckboxGroup, Toast } from 'vant'
import buttonList from './buttonList.vue'
export default defineComponent({
	components: {
		buttonList,
	},
	setup() {
		let activeNames: Ref<string[]> = ref([])
		let total: Ref<number> = ref(10)
		let pageSize: Ref<number> = ref(1)
		const cellChange = (arr: Array<string>): void => {
			console.log(arr)
		}
		provide('total', total)
		provide('pageSize', pageSize)
		return { activeNames, cellChange }
	},
})
</script>

<style lang="scss" scoped>
.detail-wrap {
	width: 100%;
	height: calc(100% - 49px);
	padding-bottom: 49px;
	position: relative;
	background: #fafafa;
	.detail-title {
		position: relative;
		padding-top: 16px;
		padding-left: 20px;
		font-size: 15px;
		color: #505050;
		&::before {
			display: inline-block;
			content: url('../../assets/title.png');
			position: absolute;
			left: 10px;
			top: 16px;
		}
	}
	.detail-wrap-content {
		height: 100%;
		overflow: auto;
		.detail-base {
			height: 195px;
			width: 100%;
			box-sizing: border-box;
			padding-bottom: 18px;
			background-color: #fff;
			&-content {
				padding-top: 10px;
				.van-cell:last-child::after {
					display: inline-block;
				}
			}
		}
		.unfinished {
			:deep(.van-cell) {
				background: #eff1f4;
			}
		}
		.detail-binding {
			margin-top: 5px;
			background-color: #fff;
			&-success {
				color: #22d610;
			}
			&-total {
				color: #367ef5;
			}
			&-cell {
				padding: 6px 9px;
				&:first-child {
					padding-top: 15px;
				}
				:deep(.van-cell) {
					display: flex;
					align-items: center;
					padding: 6px 11px;
					color: #367ef5;
					background-color: #e8f1ff;
					border-radius: 2px;
					.van-icon::before {
						color: #367ef5;
					}
				}
				.binding-detail {
					&-check {
						display: flex;
						justify-content: space-around;
						:deep(span) {
							color: #666;
							font-size: 13px;
							height: 22px;
							line-height: 22px;
						}
					}
					&-form {
						padding-top: 10px;
						:deep(.van-cell) {
							padding: 10px 0;
							background-color: #fff;
							span {
								color: #999;
							}
							&::after {
								left: 0;
								right: 0;
							}
						}
						&-prompt {
							position: relative;
							font-size: 12px;
							color: #ff8c32;
							padding-left: 20px;
							span {
								display: inline-block;
								position: absolute;
								left: 0px;
								top: 3px;
								width: 12px;
								height: 12px;
								background: url('../../assets/tixing.png') no-repeat;
							}
						}
					}
				}
			}
		}
	}
}
</style>
