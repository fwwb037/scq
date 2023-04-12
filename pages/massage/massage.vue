<template>
	<view>
		<tm-card
					subTitle="完整卡片"
					title="这是一个完整的属性示例,详见文档"
					subText="这是一段介绍,见文档"
					:content="text"
					:action="['确认', '删除']"
					:btnColor="['primary', 'red']"
					statusText="当前未领取"
					statusColor="red"
					<!-- :class="[$tm.vx.state().tmVuetify.color]" -->
				></tm-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
