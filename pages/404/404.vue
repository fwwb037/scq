<template>
	<view>
		<text>当前页面不存在</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		onLoad() {
			let timer=setTimeout(()=>{
				clearTimeout(timer)
				uni.navigateTo({
					url:'/pages/index/index'
				})
			},2000)
		}
	}
</script>

<style>

</style>
