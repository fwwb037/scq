<template>
	<view class="tabbar">
		<view class="tabbar-item" :class="{'active':itemIndex==1}" @click="tabbarItemClick(1)">
			<text class="icon">&#xe7c6;</text>
			<view class="text">
				分析
			</view>
			
		</view>
		<view class="tabbar-item" :class="{'active':itemIndex==2}" @click="tabbarItemClick(2)">
			<text class="icon">&#xe619;</text>
			<view class="text">
				上传
			</view>
		</view>
		<view class="tabbar-item" :class="{'active':itemIndex==3}" @click="tabbarItemClick(3)">
			<text class="icon">&#xe78a;</text>
			<view class="text">
				消息
			</view>
		</view>
		<view class="tabbar-item" :class="{'active':itemIndex==4}" @click="tabbarItemClick(4)">
			<text class="icon">&#xe78e;</text>
			<view class="text">
				设置
			</view>
		</view>
		<view class="indicator" v-bind:style="[{ left: `${leftValue}px`}]"></view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				itemIndex: 0,
				leftValue: -100
			}
		},
		mounted() {
			this.tabbarItemClick(1)
		},
		methods: {
			tabbarItemClick(i) {
				console.log(i)
				console.log(typeof(i))
				// if(i===1){
				// 	console.log('gotolist')
				// 	uni.navigateTo({
				// 		url:'/pages/index/index'
				// 	})
				// };
				if(i===2){
					uni.navigateTo({
						url:'/pages/photo/photo'
					})
				};
				if(i===3){
					uni.navigateTo({
						url:'/pages/massage/massage'
					})
				};
				if(i===4){
					uni.navigateTo({
						url:'/pages/setting/setting'
					})
				};
				
				this.itemIndex =i;
				let windowInfo = uni.getWindowInfo();
				let halfItem = windowInfo.windowWidth / 8 - 32
				this.leftValue = (i - 1) * ((windowInfo.windowWidth-10) / 4) + halfItem;
			}
		}
	}
</script>
<style lang="scss">
	@font-face {
		font-family: 'iconfont';
		/* Project id 3676987 */
		src:
			url('//at.alicdn.com/t/c/font_3676987_zj4z2gl74k.woff2?t=1665897587205') format('woff2'),
			url('//at.alicdn.com/t/c/font_3676987_zj4z2gl74k.woff?t=1665897587205') format('woff'),
			url('//at.alicdn.com/t/c/font_3676987_zj4z2gl74k.ttf?t=1665897587205') format('truetype');
	}

	.icon {
		font-family: iconfont;
	}

	// .main-content {
	// 	height: 100vh;
	// 	background: #222327;

	.tabbar {
		display: flex;
		height: 55px;
		background-color: #DBEEEA;
		border-radius: 10px;
		position: absolute;
		bottom: 6px;
		left: 5px;
		right: 5px;
		justify-content: space-around;

		.tabbar-item {
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: center;
			z-index: 1;

			.icon {

				font-size: 25px;
				text-align: center;
				transition: 0.5s;
				transform: translateY(9px);
			}

			.text {
				text-align: center;
				transition: 0.5s;
				opacity: 0;
			}

			&.active .text {
				transform: translateY(1px);
				opacity: 1;
			}

			&.active .icon {
				transform: translateY(-13px);
			}

		}

		.indicator {
			position: absolute;
			top: -30px;
			border-radius: 50%;
			border: 6px solid #fff;
			width: 50px;
			height: 50px;
			background: #5CAA94;
			transition: 0.5s;
		}

		.indicator::before {
			content: '';
			position: absolute;
			top: 41%;
			left: -23px;
			width: 20px;
			height: 20px;
			background: transparent;
			border-top-right-radius: 20px;
			box-shadow: 0px -10px 0 0 #fff;
		}

		.indicator::after {
			content: '';
			position: absolute;
			top: 41%;
			right: -23px;
			width: 20px;
			height: 20px;
			background: transparent;
			border-top-left-radius: 20px;
			box-shadow: 0px -10px 0 0 #fff;
		}
	}

</style>
